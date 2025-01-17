"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import CreateUserWorkoutForm from "./CreateUserWorkoutForm";
import {
  WorkoutWithPlannedExercises,
  WorkoutWithPlannedExerciseBaseCreateInput,
  WorkoutWithPlannedExerciseBaseUpdateInput,
} from "@/types/workout";
import {
  WorkoutPlanWithWorkouts,
  UpdateWorkoutPlanInput,
  CreateWorkoutPlanInput,
} from "@/types/workoutPlan";
import { useAppContext } from "@/contexts/AppContext";
import { Loader2 } from "lucide-react";
import { EditUserWorkoutForm } from "./EditUserWorkoutForm";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  workoutPlanId: z.string().optional(),
  userWorkouts: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(1, "Name is required"),
        order: z.number().min(1, "Order must be at least 1"),
        exercises: z.array(
          z.object({
            id: z.string().optional(),
            exerciseId: z.string().min(1, "Exercise is required"),
            sets: z.number().min(1, "Sets must be at least 1"),
            reps: z.number().min(1, "Reps must be at least 1"),
            rpe: z.number().optional(),
            order: z.number().min(1, "Order must be at least 1"),
          })
        ),
      })
    )
    .min(1, "At least one workout is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function UserWorkoutPlanForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] =
    useState<WorkoutWithPlannedExercises | null>(null);
  const router = useRouter();

  const {
    userWorkoutPlan,
    updateUserWorkoutPlan,
    createUserWorkoutPlan,
  }: {
    userWorkoutPlan: WorkoutPlanWithWorkouts | null;
    updateUserWorkoutPlan: (
      data: UpdateWorkoutPlanInput
    ) => Promise<WorkoutPlanWithWorkouts>;
    createUserWorkoutPlan: (
      data: CreateWorkoutPlanInput
    ) => Promise<WorkoutPlanWithWorkouts>;
  } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userWorkoutPlan?.name || "",
      workoutPlanId: userWorkoutPlan?.id || undefined,
      userWorkouts: userWorkoutPlan?.workouts || [],
    },
  });

  useEffect(() => {
    form.reset({
      name: userWorkoutPlan?.name || "",
      workoutPlanId: userWorkoutPlan?.id || undefined,
      userWorkouts: userWorkoutPlan?.workouts || [],
    });
  }, [userWorkoutPlan, form]);

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "userWorkouts",
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const formattedData: UpdateWorkoutPlanInput = {
        ...values,
        id: userWorkoutPlan?.id || "",
        userId: userWorkoutPlan?.userId || "",
        workouts: fields as WorkoutWithPlannedExercises[],
      };

      if (!userWorkoutPlan) {
        const data: CreateWorkoutPlanInput = {
          ...values,
          workouts: fields.map((field) => ({
            name: field.name,
            description: "",
            order: field.order,
            exercises: field.exercises.map((exercise) => ({
              exerciseId: exercise.exerciseId,
              sets: exercise.sets,
              reps: exercise.reps,
              rpe: exercise.rpe || 0,
              order: exercise.order,
            })),
          })),
        };

        await createUserWorkoutPlan(data);
      } else {
        // Update the workout plan
        await updateUserWorkoutPlan(formattedData);
      }

      // Navigate to the workout plans page
      router.push("/workout-plans");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateWorkout = async (
    data: WorkoutWithPlannedExerciseBaseCreateInput
  ) => {
    append({
      ...data,
      exercises: [],
    });
    setIsDrawerOpen(false);
  };

  const handleUpdateWorkout = async (
    data: WorkoutWithPlannedExerciseBaseUpdateInput
  ) => {
    const index = fields.findIndex((workout) => workout.id === data.id);
    if (index !== -1) {
      update(index, {
        id: data.id,
        name: data.name || fields[index].name,
        order: data.order || fields[index].order,
        exercises:
          data?.exercises?.map((exercise) => ({
            ...exercise,
            order: exercise.order || 0,
            exerciseId: exercise.exerciseId || "",
            sets: exercise.sets || 0,
            reps: exercise.reps || 0,
            rpe: exercise.rpe || 0,
          })) || [],
      });
    }
    setIsDrawerOpen(false);
    setEditingWorkout(null);
  };

  useEffect(() => {
    console.log("form.formState.errors", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Plan Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter workout plan name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Workouts</h3>
            <Button
              type="button"
              onClick={() => {
                setEditingWorkout(null);
                setIsDrawerOpen(true);
              }}
            >
              Add Workout
            </Button>
          </div>
          {fields
            .sort((a, b) => a.order - b.order)
            .map((workout, index) => (
              <Card key={workout.id}>
                <CardHeader>
                  <CardTitle>{workout.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Order: {workout.order}</p>
                  <p>Exercises: {workout.exercises.length}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    onClick={() => {
                      setEditingWorkout({
                        id: workout.id || "",
                        name: workout.name,
                        order: workout.order,
                        description: "",
                        workoutPlanId: userWorkoutPlan?.id || "",
                        exercises: workout.exercises.map((exercise) => ({
                          id: exercise.id || `temp-${Date.now()}`,
                          workoutId: workout.id || "",
                          exerciseId: exercise.exerciseId,
                          sets: exercise.sets,
                          reps: exercise.reps,
                          rpe: exercise.rpe || 0,
                          order: exercise.order,
                          exercise: {
                            id: exercise.exerciseId,
                            name: "",
                            description: "",
                            createdById: "",
                            isApproved: false,
                            categoryId: "",
                            primaryMuscleGroupsIds: [],
                            secondaryMuscleGroupsIds: [],
                            equipmentIds: [],
                            createdAt: new Date(),
                            updatedAt: new Date(),
                          },
                        })),
                      });
                      setIsDrawerOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : userWorkoutPlan ? (
            "Update Plan"
          ) : (
            "Create Plan"
          )}
        </Button>

        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                {editingWorkout ? "Edit Workout" : "Add Workout"}
              </DrawerTitle>
              <DrawerDescription>
                {editingWorkout
                  ? "Modify the workout details"
                  : "Create a new workout for your plan"}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {editingWorkout ? (
                <EditUserWorkoutForm
                  workout={editingWorkout}
                  onSubmit={async (data) => {
                    await handleUpdateWorkout(data);
                  }}
                />
              ) : (
                <CreateUserWorkoutForm
                  onSubmit={(data) => {
                    handleCreateWorkout(data);
                  }}
                  userWorkoutPlanId={userWorkoutPlan?.id || ""}
                />
              )}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </form>
    </Form>
  );
}
