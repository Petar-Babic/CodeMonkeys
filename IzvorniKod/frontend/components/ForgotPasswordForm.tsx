"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Here you would typically call your password reset service
      console.log(values);
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex flex-col max-xl:pt-[4rem] max-xl:pb-[15vh] items-center xl:h-screen justify-center overflow-auto w-full 2xl:w-2/5 xl:w-2/5 lg:w-1/2 md:w-full bg-black px-8 sm:px-24 xl:px-28 2xl:px-[10%] relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold mb-4 text-[#d1d5db]">
              Forgot Password
            </h1>
            <p className="text-[#6b7280] text-sm mb-6">
              Enter your email address to reset your password.
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="text-[#d1d5db]">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="bg-transparent border-[#6b7280] text-[#d1d5db]"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button
            variant="white"
            type="submit"
            className="w-full h-10 mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>Send me email</span>
              </>
            )}
          </Button>
          <Link
            href="/sign-up"
            className="my-5 right-8 xl:right-12 xl:top-12 top-8 text-sm text-[#d1d5db] flex items-center"
          >
            <span className="mr-2">Don&apos;t have an account?</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex justify-center mt-4">
            <Link
              href="/sign-in"
              className="text-sm text-blue-400 underline hover:no-underline"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
