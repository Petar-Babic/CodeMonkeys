// @/components/SignInForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { useAuthContext } from "@/contexts/AuthContext";
import { nutritionPlans } from "@/data/nutritionPlan";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export function SignInForm() {
  const router = useRouter();
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Simulate API call to authenticate user

      // Call the login function from AuthContext
      const response = await login({
        email: values.email,
        password: values.password,
      });

      console.log("Login successful:", response);

      const userId = response.user.id;

      const res = await getNutritionPlan(userId);

      console.log("Nutrition Plan:", res);
      if (res) {
        router.push("/workouts");
      } else {
        router.push("/body-stats-and-goals");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
      // Here you might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      // Implement social login logic here
      console.log(`Logging in with ${provider}`);
      // For now, we'll just simulate a delay

      const response = await login({
        email: "johndoe@example.com",
        password: "johnjohn",
      });

      console.log(`${provider} login successful:`, response);

      const userId = response.user.id;

      const res = await getNutritionPlan(userId);

      console.log("Nutrition Plan:", res);

      if (res) {
        router.push("/workouts");
      } else {
        router.push("/body-stats-and-goals");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(`${provider} login failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNutritionPlan = async (userId: string) => {
    // Simulate API call to get user's nutrition plan
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find the nutrition plan for the given user
    const nutritionPlan = nutritionPlans.find((plan) => plan.userId === userId);

    return nutritionPlan ? true : false;
  };

  return (
    <div className="flex flex-col bg-black/80 max-xl:pt-[2rem] max-xl:justify-start items-center h-screen justify-center overflow-auto w-full 2xl:w-2/5 xl:w-2/5 lg:w-1/2 md:w-full px-8 sm:px-24 xl:px-28 2xl:px-[10%] relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold mb-4 text-white">Sign In</h1>
            <p className="text-gray-300 text-sm mb-6">
              You can choose to sign in with your email, with your Google
              account, Apple ID or Facebook account.
            </p>
            <div className="flex flex-col space-y-3">
              <Button
                type="button"
                variant="outlineWhite"
                className="w-full text-white flex items-center justify-center"
                onClick={() => handleSocialLogin("Google")}
                disabled={isLoading}
              >
                <FaGoogle />
                Sign in with Google
              </Button>
              <Button
                type="button"
                variant="outlineWhite"
                className="w-full flex text-white items-center justify-center"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={isLoading}
              >
                <FaFacebook />
                Sign in with Facebook
              </Button>
              <Button
                type="button"
                variant="outlineWhite"
                className="w-full secondary text-white flex items-center justify-center"
                onClick={() => handleSocialLogin("Apple")}
                disabled={isLoading}
              >
                <FaApple />
                Sign in with Apple
              </Button>
            </div>
            <div className="flex items-center mt-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="bg-transparent border-gray-600 text-white"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="bg-transparent border-gray-600 text-white"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          {error && (
            <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
          )}
          <Button
            variant="white"
            type="submit"
            className="w-full h-10"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </Button>
          <Link
            href="/sign-up"
            className="my-5 right-8 xl:right-12 xl:top-12 top-8 text-sm text-white flex items-center"
          >
            <span className="mr-2">Don&apos;t have an account?</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex justify-center mt-4">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-400 underline hover:no-underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
