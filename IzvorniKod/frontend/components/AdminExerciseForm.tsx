"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { useAppContext } from "@/contexts/AppContext";
import { Loader2 } from "lucide-react";
import { ExerciseBase } from "@/types/exercise";
import { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import Select from "react-select";

const formSchema = z.object({
  name: z.string().min(1, "Naziv je obavezan"),
  description: z.string().min(1, "Opis je obavezan"),
  gif: z.string().optional(),
  isApproved: z.boolean(),
  primaryMuscleGroupsIds: z
    .array(z.number())
    .min(1, "Odaberite barem jednu primarnu mišićnu grupu"),
  secondaryMuscleGroupsIds: z.array(z.number()),
});

type FormValues = z.infer<typeof formSchema>;

export function AdminExerciseForm({
  exercise,
}: {
  exercise: ExerciseBase | null;
}) {
  const router = useRouter();
  const { createExercise, updateExercise, muscleGroups, uploadFile } =
    useAppContext();
  const [selectedGif, setSelectedGif] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    exercise?.gif ? `/api/upload/${exercise.gif}` : null
  );

  // console.log("muscleGroups in form", muscleGroups);

  // console.log("exercise in form", exercise);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: exercise?.name || "",
      description: exercise?.description || "",
      gif: exercise?.gif || "",
      isApproved: exercise?.isApproved || false,
      primaryMuscleGroupsIds: exercise?.primaryMuscleGroupsIds || [],
      secondaryMuscleGroupsIds: exercise?.secondaryMuscleGroupsIds || [],
    },
  });

  const handleGifChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedGif(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      form.setValue("gif", objectUrl);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      let gifUrl = values.gif;
      console.log("selectedGif", selectedGif);

      if (selectedGif) {
        console.log("uploading file");
        gifUrl = await uploadFile(selectedGif);
        console.log("gifUrl", gifUrl);
      }

      console.log("gifUrl", gifUrl);

      const exerciseData = {
        ...values,
        gif: gifUrl,
      };

      console.log("Sending exercise data:", exerciseData);

      if (!exercise) {
        await createExercise(exerciseData);
      } else {
        await updateExercise(exercise.id, exerciseData);
      }
      router.push("/admin/exercises");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naziv</FormLabel>
              <FormControl>
                <Input placeholder="Unesite naziv vježbe" {...field} />
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
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Input placeholder="Unesite opis vježbe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gif"
          render={({ field: { ref, name, onBlur } }) => (
            <FormItem>
              <FormLabel>GIF animacija</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/gif"
                    onChange={handleGifChange}
                    ref={ref}
                    name={name}
                    onBlur={onBlur}
                  />
                  {previewUrl && (
                    <div className="mt-4">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isApproved"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Odobreno</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primaryMuscleGroupsIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primarne mišićne grupe</FormLabel>
              <FormControl>
                <Select
                  isMulti
                  value={muscleGroups
                    .filter((group) => field.value.includes(group.id))
                    .map((group) => ({
                      value: group.id,
                      label: group.name,
                    }))}
                  onChange={(newValue) => {
                    field.onChange(newValue.map((item) => item.value));
                  }}
                  options={muscleGroups.map((group) => ({
                    value: group.id,
                    label: group.name,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Odaberite primarne mišićne grupe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondaryMuscleGroupsIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sekundarne mišićne grupe</FormLabel>
              <FormControl>
                <Select
                  isMulti
                  value={muscleGroups
                    .filter((group) => field.value.includes(group.id))
                    .map((group) => ({
                      value: group.id,
                      label: group.name,
                    }))}
                  onChange={(newValue) => {
                    field.onChange(newValue.map((item) => item.value));
                  }}
                  options={muscleGroups.map((group) => ({
                    value: group.id,
                    label: group.name,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Odaberite sekundarne mišićne grupe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : exercise ? (
            "Ažuriraj"
          ) : (
            "Dodaj"
          )}
        </Button>
      </form>
    </Form>
  );
}
