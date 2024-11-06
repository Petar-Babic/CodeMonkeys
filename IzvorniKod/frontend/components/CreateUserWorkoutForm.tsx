"use client";
import { UserWorkoutWithUserPlannedExerciseCreateInput } from "@/types/userWorkout";
import { useState } from "react";
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
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  order: z.number().min(1, "Order must be at least 1"),
  exercises: z.array(
    z.object({
      exerciseId: z.string().min(1, "Exercise is required"),
      sets: z.number().min(1, "Sets must be at least 1"),
      reps: z.number().min(1, "Reps must be at least 1"),
      rpe: z.number().optional(),
      order: z.number().min(1, "Order must be at least 1"),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateUserWorkoutForm({
  onSubmit,
  userWorkoutPlanId,
}: {
  onSubmit: (data: UserWorkoutWithUserPlannedExerciseCreateInput) => void;
  userWorkoutPlanId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { exercises }: { exercises: ExerciseBase[] } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      order: 1,
      exercises: [],
    },
  });

  const { fields, replace, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const formattedData: UserWorkoutWithUserPlannedExerciseCreateInput = {
        name: values.name,
        userWorkoutPlanId: userWorkoutPlanId,
        order: values.order,
        exercises: values.exercises
          .map((exercise, index) => ({
            ...exercise,
            order: index + 1,
            exercise: exercises.find(
              (e) => e.id === exercise.exerciseId
            ) as ExerciseBase,
          }))
          .filter((exercise) => exercise.exercise !== undefined),
      };
      await onSubmit(formattedData);
    } catch (error) {
      console.error("Error submitting form:", error);
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
        };
      }
    });
    replace(updatedExercises);
  };

  const getInitialSelectedExercises = () => {
    return exercises.filter((exercise) =>
      fields.some((field) => field.exerciseId === exercise.id)
    );
  };

  return (
    <Form {...form}>
      <div onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
          Choose Exercises
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
            "Create Workout"
          )}{" "}
        </Button>

        <ChooseExercisesDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          onExercisesSelected={handleExercisesSelected}
          initialSelectedExercises={getInitialSelectedExercises()}
        />
      </div>
    </Form>
  );
}
