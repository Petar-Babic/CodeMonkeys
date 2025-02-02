"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExerciseBase } from "@/types/exercise";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChooseExercisesDrawer } from "./ChooseExercisesDrawer";
import {
  WorkoutWithPlannedExercisesBase,
  WorkoutWithPlannedExerciseBaseUpdateInput,
} from "@/types/workout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  order: z.coerce.number().min(1, "Order must be at least 1"),
  exercises: z
    .array(
      z.object({
        id: z.number().optional(),
        workoutId: z.number().optional(),
        exerciseId: z.number(),
        sets: z.coerce.number().min(1, "Sets must be at least 1"),
        reps: z.coerce.number().min(1, "Reps must be at least 1"),
        rpe: z.coerce.number().optional(),
        order: z.coerce.number().min(1, "Order must be at least 1"),
      })
    )
    .min(1, "At least one exercise is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditUserWorkoutFormProps {
  workout: Omit<
    WorkoutWithPlannedExercisesBase,
    "description" | "workoutPlanId"
  >;
  onSubmit: (data: WorkoutWithPlannedExerciseBaseUpdateInput) => Promise<void>;
}

export function EditUserWorkoutForm({
  workout,
  onSubmit,
}: EditUserWorkoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { exercises }: { exercises: ExerciseBase[] } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: workout.id,
      name: workout.name,
      order: workout.order || 1,
      exercises: workout.exercises.map((exercise) => ({
        id: exercise.id,
        exerciseId: exercise.exerciseId,
        sets: exercise.sets,
        reps: exercise.reps,
        rpe: exercise.rpe,
        order: exercise.order,
        workoutId: workout.id,
      })),
    },
  });

  const { fields, remove, replace } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const formattedData: WorkoutWithPlannedExerciseBaseUpdateInput = {
        id: workout.id,
        name: values.name,
        order: values.order,
        exercises: values.exercises.map((exercise) => ({
          ...exercise,
          id: exercise.id || 0,
          exerciseId: exercise.exerciseId,
          order: exercise.order,
          sets: exercise.sets,
          reps: exercise.reps,
          rpe: exercise.rpe || 0,
          workoutId: workout.id,
          exercise: exercises.find((e) => e.id === exercise.exerciseId)!,
        })),
      };
      await onSubmit(formattedData);
    } catch (error) {
      console.error("Error updating workout:", error);
      setSubmitError("Failed to update workout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExercisesSelected = (selectedExercises: ExerciseBase[]) => {
    const updatedExercises = selectedExercises.map((exercise) => {
      const existingExercise = fields.find(
        (field) => field.exerciseId === exercise.id
      );
      if (existingExercise) {
        return existingExercise;
      } else {
        return {
          exerciseId: exercise.id,
          sets: 1,
          reps: 1,
          rpe: 1,
          order: fields.length + 1,
          workoutId: workout.id,
          exercise: exercise,
        };
      }
    });
    replace(updatedExercises);
  };

  const getInitialSelectedExercises = () => {
    return exercises.filter((exercise) =>
      workout.exercises.some((e) => e.exerciseId === exercise.id)
    );
  };

  useEffect(() => {
    console.log("form.formState.errors", form.formState.errors);
  }, [form.formState.errors]);

  useEffect(() => {
    console.log("Workout object in EditUserWorkoutForm:", workout);
    form.reset({
      name: workout.name,
      order: workout.order || 1,
      exercises: workout.exercises.map((exercise) => ({
        id: exercise.id,
        exerciseId: exercise.exerciseId,
        exercise: exercises.find((e) => e.id === exercise.exerciseId)!,
        sets: exercise.sets,
        reps: exercise.reps,
        rpe: exercise.rpe,
        order: exercise.order,
      })),
    });
  }, [workout, exercises, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter workout name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Order</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter workout order"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" onClick={() => setIsDrawerOpen(true)}>
          Add/Edit Exercises
        </Button>

        <div className="space-y-4">
          {fields
            .sort((a, b) => a.order - b.order)
            .map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <CardTitle>
                    {exercises.find((e) => e.id === field.exerciseId)?.name ||
                      "Exercise"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`exercises.${index}.sets`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sets</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`exercises.${index}.reps`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reps</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`exercises.${index}.rpe`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RPE (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Rate of Perceived Exertion (1-10)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`exercises.${index}.order`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove Exercise
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>

        <Button
          disabled={isSubmitting}
          onClick={form.handleSubmit(handleSubmit)}
          type="button"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Update Workout"
          )}
        </Button>

        <ChooseExercisesDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          onExercisesSelected={handleExercisesSelected}
          initialSelectedExercises={getInitialSelectedExercises()}
        />
      </form>
    </Form>
  );
}
