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
import {
  FaGoogle,
  FaFacebook,
  // FaApple
} from "react-icons/fa";
import { useAuthContext } from "@/contexts/AuthContext";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters long.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean[]>([false, false, false]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { signUp, socialLogin } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading([true, false, false]);

    try {
      // Here you would typically call your registration service
      // For example: await signUp(values.name, values.email, values.password)
      console.log(values);

      const response = await signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      console.log("Sign up successful:", response);

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      router.push("/workouts");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading([false, false, false]);
    }
  }

  const handleSocialLogin = async (provider: string, index: number) => {
    setIsLoading([
      ...isLoading.slice(0, index),
      true,
      ...isLoading.slice(index + 1),
    ]);
    try {
      const result = await socialLogin(provider);

      if (result.error) {
        console.error(result.error);
        return;
      }

      router.push("/workouts");
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setIsLoading([false, false, false]);
    }
  };

  return (
    <div className="flex flex-col bg-black/80 max-xl:pt-[2rem] max-xl:justify-start items-center h-screen justify-center overflow-auto w-full 2xl:w-2/5 xl:w-2/5 lg:w-1/2 md:w-full px-8 sm:px-24 xl:px-28 2xl:px-[10%] relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold mb-4 text-white">Sign Up</h1>
            <p className="text-gray-300 text-sm mb-6">
              Create an account or sign up with your Google, Apple ID, or
              Facebook account.
            </p>
            <div className="flex flex-col space-y-3">
              <Button
                variant="outlineWhite"
                type="button"
                onClick={() => handleSocialLogin("Google", 1)}
                className="w-full text-white flex items-center justify-center"
              >
                {isLoading[1] ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <FaGoogle />
                    Sign up with Google
                  </>
                )}
              </Button>
              <Button
                variant="outlineWhite"
                type="button"
                onClick={() => handleSocialLogin("Facebook", 2)}
                className="w-full flex text-white items-center justify-center"
              >
                {isLoading[2] ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <FaFacebook />
                    Sign up with Facebook
                  </>
                )}
              </Button>
              {/* <Button
                variant="outlineWhite"
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                className="w-full secondary text-white flex items-center justify-center"
              >
                <FaApple />
                Sign up with Apple
              </Button> */}
            </div>
            <div className="flex items-center mt-6">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel className="text-white">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="bg-transparent border-gray-600 text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
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
              <FormItem className="mb-2">
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...field}
                      className="bg-transparent border-gray-600 text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...field}
                      className="bg-transparent border-gray-600 text-white"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                    >
                      {showConfirmPassword ? (
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
          <Button
            variant="white"
            type="submit"
            className="w-full h-10"
            disabled={isLoading[0]}
          >
            {isLoading[0] ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <span>Sign Up</span>
              </>
            )}
          </Button>
          <Link
            href="/sign-in"
            className="my-5 right-8 xl:right-12 xl:top-12 top-8 text-sm text-white flex items-center"
          >
            <span className="mr-2">Already have an account?</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-300">
              By signing up, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="text-blue-400 underline hover:no-underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-400 underline hover:no-underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
