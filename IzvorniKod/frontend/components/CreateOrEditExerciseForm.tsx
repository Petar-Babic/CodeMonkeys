"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useExercise } from "@/hooks/useExercise";
import { useMuscleGroup } from "@/hooks/useMuscleGroup";
import { ExerciseBase, CreateExerciseInput } from "@/types/exercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Exercise name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  gifUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .optional()
    .or(z.literal("")),
  categoryId: z.string(),
  primaryMuscleGroupId: z
    .array(z.string())
    .min(1, "Select at least one primary muscle group"),
  secondaryMuscleGroupIds: z.array(z.string()),
});

type FormData = z.infer<typeof formSchema>;

interface CreateOrEditExerciseFormProps {
  exercise?: ExerciseBase;
  onSuccess?: () => void;
}

export function CreateOrEditExerciseForm({
  exercise,
  onSuccess,
}: CreateOrEditExerciseFormProps) {
  const { createExercise, updateExercise } = useExercise();
  const { muscleGroups, getAllMuscleGroups } = useMuscleGroup();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: exercise?.name || "",
      description: exercise?.description || "",
      gifUrl: exercise?.gifUrl || "",
      categoryId: exercise?.categoryId || "",
      primaryMuscleGroupId: exercise?.primaryMuscleGroupId || [],
      secondaryMuscleGroupIds: exercise?.secondaryMuscleGroupIds || [],
    },
  });

  useEffect(() => {
    getAllMuscleGroups();
  }, [getAllMuscleGroups]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setFormMessage(null);
    try {
      if (exercise) {
        await updateExercise(exercise.id, data);
        setFormMessage({
          type: "success",
          message: "Exercise updated successfully",
        });
      } else {
        await createExercise(data as CreateExerciseInput);
        setFormMessage({
          type: "success",
          message: "Exercise created successfully",
        });
      }
      onSuccess?.();
      if (!exercise) {
        form.reset();
      }
    } catch (error) {
      console.error(error);
      setFormMessage({
        type: "error",
        message: "An error occurred while saving the exercise",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formMessage && (
          <Alert
            variant={formMessage.type === "success" ? "default" : "destructive"}
          >
            {formMessage.type === "success" ? (
              <CheckCircledIcon className="h-4 w-4" />
            ) : (
              <CrossCircledIcon className="h-4 w-4" />
            )}
            <AlertTitle>
              {formMessage.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>{formMessage.message}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter exercise name" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter exercise description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gifUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GIF URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter GIF URL" {...field} />
              </FormControl>
              <FormDescription>
                URL of a GIF demonstrating the exercise
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="cardio">Cardio</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryMuscleGroupId"
          render={() => (
            <FormItem>
              <FormLabel>Primary Muscle Groups</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {muscleGroups.map((muscleGroup) => (
                  <FormField
                    key={muscleGroup.id}
                    control={form.control}
                    name="primaryMuscleGroupId"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={muscleGroup.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(muscleGroup.id)}
                              onCheckedChange={(
                                checked: boolean | "indeterminate"
                              ) => {
                                return checked === true
                                  ? field.onChange([
                                      ...field.value,
                                      muscleGroup.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) =>
                                          value !== muscleGroup.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {muscleGroup.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryMuscleGroupIds"
          render={() => (
            <FormItem>
              <FormLabel>Secondary Muscle Groups</FormLabel>
              <div className="grid grid-cols-2 gap-2">
                {muscleGroups.map((muscleGroup) => (
                  <FormField
                    key={muscleGroup.id}
                    control={form.control}
                    name="secondaryMuscleGroupIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={muscleGroup.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(muscleGroup.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      muscleGroup.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== muscleGroup.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {muscleGroup.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : exercise
            ? "Update Exercise"
            : "Create Exercise"}
        </Button>
      </form>
    </Form>
  );
}
