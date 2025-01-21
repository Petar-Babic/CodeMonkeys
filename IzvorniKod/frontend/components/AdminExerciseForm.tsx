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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { createExercise, updateExercise, muscleGroups } = useAppContext();
  const [selectedGif, setSelectedGif] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    exercise?.gif || null
  );

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

      if (selectedGif) {
        // Ovdje bi trebao biti stvarni upload GIF-a na server
        // Za sada samo simuliramo
        gifUrl = previewUrl || "";
      }

      if (!exercise) {
        await createExercise({
          ...values,
          gif: gifUrl,
        });
      } else {
        await updateExercise(exercise.id, {
          ...values,
          gif: gifUrl,
        });
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
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>GIF animacija</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/gif"
                    onChange={handleGifChange}
                    {...field}
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
                  value={field.value.join(",")}
                  onValueChange={(value) => {
                    field.onChange(value.split(",").map(Number));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberite primarne mišićne grupe" />
                  </SelectTrigger>
                  <SelectContent>
                    {muscleGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  value={field.value.join(",")}
                  onValueChange={(value) => {
                    field.onChange(value.split(",").map(Number));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberite sekundarne mišićne grupe" />
                  </SelectTrigger>
                  <SelectContent>
                    {muscleGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
