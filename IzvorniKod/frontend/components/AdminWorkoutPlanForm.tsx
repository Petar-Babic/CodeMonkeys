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
  WorkoutWithPlannedExerciseBaseCreateInput,
  WorkoutWithPlannedExerciseBaseUpdateInput,
  WorkoutWithPlannedExercise,
} from "@/types/workout";
import {
  UpdateWorkoutPlanInput,
  CreateWorkoutPlanInput,
  WorkoutPlanWithWorkouts,
} from "@/types/workoutPlan";
import { useAppContext } from "@/contexts/AppContext";
import { Loader2 } from "lucide-react";
import { EditUserWorkoutForm } from "./EditUserWorkoutForm";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  userId: z.number().nullable().optional(),
  image: z.string().optional(),
  description: z.string().optional(),

  workouts: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, "Name is required"),
        order: z.number().min(1, "Order must be at least 1"),
        exercises: z.array(
          z.object({
            id: z.number().optional(),
            exerciseId: z.number(),
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

export function AdminWorkoutPlanForm({
  workoutPlan,
}: {
  workoutPlan: WorkoutPlanWithWorkouts | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Omit<
    WorkoutWithPlannedExercise,
    "description" | "workoutPlanId"
  > | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  const { updateWorkoutPlan, uploadFile, createWorkoutPlan, exercises } =
    useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workoutPlan?.name || "",
      userId: workoutPlan?.userId || undefined,
      image: workoutPlan?.image || "",
      description: workoutPlan?.description || "",
      workouts:
        workoutPlan?.workouts.map((workout, index) => ({
          ...workout,
          order: workout.order || index + 1,
          id: workout.id || 0,
          exercises: workout.exercises.map((exercise) => ({
            ...exercise,
            id: exercise.id || 0,
            exerciseId: exercise.exerciseId,
            order: exercise.order,
            sets: exercise.sets,
            reps: exercise.reps,
            rpe: exercise.rpe,
          })),
        })) || [],
    },
  });

  useEffect(() => {
    form.reset({
      name: workoutPlan?.name || "",
      userId: workoutPlan?.userId || undefined,
      image: workoutPlan?.image || "",
      description: workoutPlan?.description || "",
      workouts:
        workoutPlan?.workouts.map((workout, index) => ({
          ...workout,
          order: workout.order || index + 1,
          id: workout.id || 0,
          exercises: workout.exercises.map((exercise) => ({
            ...exercise,
            id: exercise.id || 0,
            exerciseId: exercise.exerciseId,
            order: exercise.order,
            sets: exercise.sets,
            reps: exercise.reps,
            rpe: exercise.rpe,
          })),
        })) || [],
    });

    if (workoutPlan?.image) {
      setPreviewUrl(`/api/upload/${workoutPlan.image}`);
    }
  }, [workoutPlan, form]);

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "workouts",
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      let imageUrl = values.image;

      console.log("imageUrl", imageUrl);

      if (selectedImage) {
        imageUrl = await handleUploadImage(selectedImage);
      }

      if (workoutPlan) {
        const formattedData: UpdateWorkoutPlanInput = {
          name: values.name,
          userId: values.userId,
          image: imageUrl,
          description: values.description,
          id: workoutPlan.id,
          workouts: workoutPlan.workouts.map((workout) => ({
            id: Number(workout.id),
            name: workout.name,
            description: workout.description || "",
            workoutPlanId: workoutPlan.id,
            exercises: workout.exercises.map((exercise) => ({
              id: exercise.id,
              exerciseId: exercise.exerciseId,
              sets: exercise.sets,
              reps: exercise.reps,
              rpe: exercise.rpe || 0,
              order: exercise.order,
              workoutId: Number(workout.id),
            })),
          })),
        };

        await updateWorkoutPlan(formattedData);
      } else {
        const data: CreateWorkoutPlanInput = {
          ...values,
          image: imageUrl,
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
        console.log("data in create workout plan", data);

        await createWorkoutPlan(data);
      }

      router.push("/admin/workout-plans");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateWorkout = async (
    data: WorkoutWithPlannedExerciseBaseCreateInput
  ) => {
    console.log("data in handleCreateWorkout", data);
    append({
      ...data,
      order: fields.length + 1,
      exercises: data.exercises.map((exercise) => ({
        ...exercise,
        order: exercise.order || 0,
        exerciseId: Number(exercise.exerciseId),
        sets: exercise.sets || 0,
        reps: exercise.reps || 0,
        rpe: exercise.rpe || 0,
        exercise: exercises.find((e) => e.id === exercise.exerciseId)!,
      })),
    });
    setIsDrawerOpen(false);
  };

  const handleUpdateWorkout = async (
    data: WorkoutWithPlannedExerciseBaseUpdateInput
  ) => {
    const index = fields.findIndex((workout) => workout.id === data.id);
    if (index !== -1) {
      update(index, {
        ...fields[index],
        id: data.id,
        name: data.name || fields[index].name,
        order: data.order || fields[index].order || index + 1,
        exercises:
          data?.exercises?.map((exercise) => ({
            ...exercise,
            order: exercise.order || 0,
            exerciseId: Number(exercise.exerciseId),
            sets: exercise.sets || 0,
            reps: exercise.reps || 0,
            rpe: exercise.rpe || 0,
          })) || [],
      });
    }
    setIsDrawerOpen(false);
    setEditingWorkout(null);
  };

  const handleUploadImage = async (file: File): Promise<string> => {
    try {
      const uploadData = await uploadFile(file);

      return uploadData;
    } catch (error) {
      console.error("Greška pri uploadu slike:", error);
      return "main-image-gym.webp";
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Prikazujemo lokalnu preview sliku
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter workout plan description"
                  {...field}
                />
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
                      console.log("Workout being edited:", {
                        id: workout.id,
                        name: workout.name,
                        order: workout.order,
                        exercises: workout.exercises,
                      });

                      setEditingWorkout({
                        ...workout,
                        id: workout.id || 0,
                        exercises: workout.exercises.map((exercise) => ({
                          ...exercise,
                          id: exercise.id || 0,
                          exerciseId: exercise.exerciseId,
                          order: exercise.order,
                          sets: exercise.sets,
                          reps: exercise.reps,
                          rpe: exercise.rpe || 0,
                          workoutId: workout.id || 0,
                          exercise: exercises.find(
                            (e) => e.id === exercise.exerciseId
                          )!,
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

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID (optional)</FormLabel>
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    value={field.value || ""}
                    placeholder="Leave empty for public plan"
                  />
                </FormControl>
                {field.value && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => field.onChange(null)}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { ref, name, onBlur } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                  />
                  {previewUrl && (
                    <div className="mt-4">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        className="max-w-[200px] h-auto rounded-lg"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : workoutPlan ? (
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
                  userWorkoutPlanId={Number(workoutPlan?.id)}
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

      {/* // ispisi form.state.errors */}
      <div className="text-red-500">
        <h2>Errors</h2>
        {JSON.stringify(form.formState.errors)}
      </div>
      <div className="text-red-500">
        <h2>Values</h2>
        {JSON.stringify(form.getValues())}
      </div>
    </Form>
  );
}
