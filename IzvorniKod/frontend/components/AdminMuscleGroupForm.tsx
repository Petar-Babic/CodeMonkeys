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
import { MuscleGroupBase, UpdateMuscleGroupInput } from "@/types/muscleGroup";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Naziv je obavezan"),
  description: z.string().min(1, "Opis je obavezan"),
  image: z.string().min(1, "Slika je obavezna"),
});

type FormValues = z.infer<typeof formSchema>;

export function AdminMuscleGroupForm({
  muscleGroup,
}: {
  muscleGroup: MuscleGroupBase | null;
}) {
  const router = useRouter();
  const { createMuscleGroup, updateMuscleGroup, uploadFile } = useAppContext();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    muscleGroup?.image ? `/api/upload/${muscleGroup.image}` : null
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: muscleGroup?.name || "",
      description: muscleGroup?.description || "",
      image: muscleGroup?.image || "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      form.setValue("image", objectUrl);
    }
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      let imageUrl = values.image;

      if (selectedImage) {
        // Ovdje bi trebao biti stvarni upload slike na server
        // Za sada samo simuliramo
        imageUrl = await uploadFile(selectedImage);
      }

      if (!muscleGroup) {
        await createMuscleGroup({ ...values, image: imageUrl });
      } else {
        const updateMuscleGroupInput: UpdateMuscleGroupInput = {
          id: muscleGroup.id,
          ...values,
          image: imageUrl,
        };

        await updateMuscleGroup(updateMuscleGroupInput);
      }
      router.push("/admin/muscle-groups");
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
                <Input placeholder="Unesite naziv mišićne grupe" {...field} />
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
                <Input placeholder="Unesite opis mišićne grupe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { ref, name, onBlur } }) => (
            <FormItem>
              <FormLabel>Slika</FormLabel>
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

        <Button type="submit">
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : muscleGroup ? (
            "Ažuriraj"
          ) : (
            "Dodaj"
          )}
        </Button>
      </form>
    </Form>
  );
}
