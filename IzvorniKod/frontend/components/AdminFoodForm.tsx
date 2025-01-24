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
import { FoodBase } from "@/types/food";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1, "Naziv je obavezan"),
  calories: z.number().min(0, "Kalorije moraju biti pozitivan broj"),
  protein: z.number().min(0, "Proteini moraju biti pozitivan broj"),
  carbs: z.number().min(0, "Ugljikohidrati moraju biti pozitivan broj"),
  fats: z.number().min(0, "Masti moraju biti pozitivan broj"),
  unit: z.string().min(1, "Jedinica je obavezna"),
  defaultNumber: z.number().min(1, "Default number is required"),
  approved: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function AdminFoodForm({ food }: { food: FoodBase | null }) {
  const router = useRouter();
  const { createFood, updateFood } = useAppContext();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: food?.name || "",
      calories: food?.calories || 0,
      protein: food?.protein || 0,
      carbs: food?.carbs || 0,
      fats: food?.fats || 0,
      unit: food?.unit || "",
      defaultNumber: food?.defaultNumber || 1,
      approved: food?.approved || false,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!food) {
        await createFood(values);
      } else {
        await updateFood({ ...values, id: food.id });
      }
      router.push("/admin/food");
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
                <Input placeholder="Unesite naziv hrane" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kalorije</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Unesite broj kalorija"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="protein"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proteini (g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Unesite količinu proteina"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="carbs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ugljikohidrati (g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Unesite količinu ugljikohidrata"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Masti (g)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Unesite količinu masti"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jedinica</FormLabel>
              <FormControl>
                <Input placeholder="Unesite jedinicu hrane" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Unesite default number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="approved"
          render={({ field }) => (
            <FormItem>
              {" "}
              <FormLabel>Odobreno</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  value={field.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberite status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Odobreno</SelectItem>
                    <SelectItem value="false">Nije odobreno</SelectItem>
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
          ) : food ? (
            "Ažuriraj"
          ) : (
            "Dodaj"
          )}
        </Button>
      </form>
    </Form>
  );
}
