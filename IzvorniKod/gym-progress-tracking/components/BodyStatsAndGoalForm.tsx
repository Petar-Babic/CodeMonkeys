"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useUser } from "@/hooks/useUser";
import { CustomUnitSwitch } from "./CustomUnitSwitch";
import {
  Bed,
  User,
  Activity,
  Dumbbell,
  Bike,
  Loader2,
  Smile,
} from "lucide-react";
import { BodyStatsAndGoalDataType } from "@/types/bodyStatsAndGoal";
import { ActivityLevel, Gender } from "@/types/user";
import StepProgress from "./StepProgress";

const activityLevels = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Little to no exercise",
    icon: Bed,
    factor: 1.2,
  },
  {
    value: "light",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
    icon: User,
    factor: 1.375,
  },
  {
    value: "moderate",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
    icon: Activity,
    factor: 1.55,
  },
  {
    value: "active",
    label: "Active",
    description: "Hard exercise 6-7 days/week",
    icon: Dumbbell,
    factor: 1.725,
  },
  {
    value: "very-active",
    label: "Very Active",
    description: "Very hard exercise, physical job or training twice a day",
    icon: Bike,
    factor: 1.9,
  },
];

const genderOptions = [
  {
    value: "male",
    label: "Male",
    icon: Smile,
  },
  {
    value: "female",
    label: "Female",
    icon: Smile,
  },
];

const formSchema = z.object({
  height: z
    .string()
    .nonempty("Height is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Height must be a positive number",
    }),
  isHeightImperial: z.boolean(),
  gender: z.enum(["male", "female"]),
  weight: z
    .string()
    .nonempty("Weight is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Weight must be a positive number",
    }),
  isWeightImperial: z.boolean(),
  goalWeight: z
    .string()
    .nonempty("Goal weight is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Goal weight must be a positive number",
    }),
  isGoalWeightImperial: z.boolean(),
  activityLevel: z.enum([
    "sedentary",
    "light",
    "moderate",
    "active",
    "very-active",
  ]),
  timelineWeeks: z
    .number()
    .int("Timeline must be a whole number")
    .min(1, "Timeline must be at least 1 week"),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
});

export default function BodyStatsAndGoalForm() {
  const router = useRouter();
  const { user, bodyStatsAndGoal, isLoading, error } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [calculatedCalories, setCalculatedCalories] = useState<number | null>(
    null
  );
  const [totalCalories, setTotalCalories] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      height: user?.height?.toString() || "",
      isHeightImperial: false,
      gender: "male",
      weight: user?.weight?.toString() || "",
      isWeightImperial: false,
      goalWeight: "",
      isGoalWeightImperial: false,
      activityLevel: "moderate",
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  });

  function convertToKg(value: number, isImperial: boolean): number {
    return isImperial ? value * 0.453592 : value;
  }

  function calculateRequiredCalories(
    currentWeight: number,
    goalWeight: number,
    timelineWeeks: number,
    activityLevel: string,
    gender: string,
    height: number
  ) {
    const weightDifference = currentWeight - goalWeight;
    const caloriesPerKg = 7700; // Approximate calories per kg of body fat
    const totalCaloriesNeeded = weightDifference * caloriesPerKg;
    const dailyCalorieDeficit = totalCaloriesNeeded / (timelineWeeks * 7);

    // Calculate BMR using the Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * currentWeight + 6.25 * height - 5 * 30 + 5;
    } else {
      bmr = 10 * currentWeight + 6.25 * height - 5 * 30 - 161;
    }

    const activityFactor =
      activityLevels.find((level) => level.value === activityLevel)?.factor ||
      1.55;
    const maintenanceCalories = bmr * activityFactor;

    return Math.round(maintenanceCalories - dailyCalorieDeficit);
  }

  useEffect(() => {
    const weight = parseFloat(form.getValues("weight"));
    const goalWeight = parseFloat(form.getValues("goalWeight"));
    const timelineWeeks = form.getValues("timelineWeeks");
    const activityLevel = form.getValues("activityLevel");
    const gender = form.getValues("gender");
    const height = parseFloat(form.getValues("height"));
    const isWeightImperial = form.getValues("isWeightImperial");
    const isGoalWeightImperial = form.getValues("isGoalWeightImperial");
    const isHeightImperial = form.getValues("isHeightImperial");

    if (weight && goalWeight && timelineWeeks && activityLevel && height) {
      const weightInKg = convertToKg(weight, isWeightImperial);
      const goalWeightInKg = convertToKg(goalWeight, isGoalWeightImperial);
      const heightInCm = isHeightImperial ? height * 2.54 : height;
      const calories = calculateRequiredCalories(
        weightInKg,
        goalWeightInKg,
        timelineWeeks,
        activityLevel,
        gender,
        heightInCm
      );
      setCalculatedCalories(calories);

      // Set initial macronutrient values
      const initialProtein = Math.round((calories * 0.3) / 4); // 30% of calories from protein
      const initialFat = Math.round((calories * 0.3) / 9); // 30% of calories from fat
      const initialCarbs = Math.round((calories * 0.4) / 4); // 40% of calories from carbs

      form.setValue("protein", initialProtein);
      form.setValue("fat", initialFat);
      form.setValue("carbs", initialCarbs);
    }
  }, [
    form.watch("weight"),
    form.watch("goalWeight"),
    form.watch("timelineWeeks"),
    form.watch("activityLevel"),
    form.watch("gender"),
    form.watch("height"),
    form.watch("isWeightImperial"),
    form.watch("isGoalWeightImperial"),
    form.watch("isHeightImperial"),
  ]);

  useEffect(() => {
    const protein = form.getValues("protein");
    const carbs = form.getValues("carbs");
    const fat = form.getValues("fat");

    const totalCals = protein * 4 + carbs * 4 + fat * 9;
    setTotalCalories(totalCals);
  }, [form.watch("protein"), form.watch("carbs"), form.watch("fat")]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data: BodyStatsAndGoalDataType = {
        height: values.height,
        isHeightImperial: values.isHeightImperial,
        weight: values.weight,
        isWeightImperial: values.isWeightImperial,
        goalWeight: values.goalWeight,
        isGoalWeightImperial: values.isGoalWeightImperial,
        gender: values.gender === "male" ? Gender.MALE : Gender.FEMALE,
        activityLevel:
          values.activityLevel === "active"
            ? ActivityLevel.ACTIVE
            : values.activityLevel === "very-active"
            ? ActivityLevel.VERY_ACTIVE
            : values.activityLevel === "moderate"
            ? ActivityLevel.MODERATE
            : values.activityLevel === "light"
            ? ActivityLevel.LIGHT
            : ActivityLevel.SEDENTARY,
        timelineWeeks: values.timelineWeeks,
        protein: values.protein,
        carbs: values.carbs,
        fat: values.fat,
        calories: calculatedCalories || 0,
      };

      await bodyStatsAndGoal(data);
      if (!error) {
        router.push("/workouts");
      }
    } catch (error) {
      router.push("/sign-in");
      console.error("Failed to update user data:", error);
    }
  }

  const handleNextStep = async () => {
    setDirection("forward");
    const fields = [
      "height",
      "gender",
      "weight",
      "goalWeight",
      "activityLevel",
      "timelineWeeks",
      "protein",
      "carbs",
      "fat",
    ];
    const isValid = await form.trigger(
      fields[currentStep - 1] as keyof z.infer<typeof formSchema>
    );

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const handlePreviousStep = () => {
    setDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex flex-col bg-black/80 max-xl:pt-[4rem] max-xl:pb-[15vh] items-center h-screen justify-center overflow-auto w-full 2xl:w-2/5 xl:w-2/5 lg:w-1/2 md:w-full px-8 sm:px-24 xl:px-28 2xl:px-[10%] relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md relative"
        >
          <div className="h-[500px] overflow-hidden">
            {currentStep === 1 && (
              <div
                key={currentStep}
                className={`${
                  direction === "forward"
                    ? "animate-in slide-in-from-right"
                    : "animate-in slide-in-from-left"
                } duration-300 ease-in-out`}
              >
                <div className="text-center mb-4 xl:mb-20">
                  <h1 className="text-3xl font-bold mb-4 text-white">
                    Enter Your Height
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-10 items-center gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Height"
                            {...field}
                            className="bg-transparent text-3xl py-10 flex items-center text-center align-middle w-[10rem] border-x-0 border-t-0 border-b border-gray-200 rounded-none text-white focus:ring-0 focus:bg-transparent"
                          />
                        </FormControl>
                        <Controller
                          name="isHeightImperial"
                          control={form.control}
                          render={({ field }) => (
                            <CustomUnitSwitch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              leftLabel="cm"
                              rightLabel="in"
                            />
                          )}
                        />
                      </div>
                      <FormMessage className="text-red-400  mt-10 w-full text-center" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div
                key={currentStep}
                className={`${
                  direction === "forward"
                    ? "animate-in slide-in-from-right"
                    : "animate-in slide-in-from-left"
                } duration-300 ease-in-out`}
              >
                <div className="text-center mb-4 xl:mb-20">
                  <h1 className="text-3xl font-bold mb-4 text-white">
                    Select Your Gender
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-1 gap-4">
                          {genderOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <Button
                                key={option.value}
                                type="button"
                                className={`flex h-[4rem] items-center justify-start py-8 bg-gray-900 text-left hover:bg-gray-700 p-4 rounded-lg
                                ${
                                  field.value === option.value
                                    ? "bg-gray-800 border border-gray-600"
                                    : ""
                                }`}
                                onClick={() => field.onChange(option.value)}
                              >
                                <Icon
                                  className="mr-3 ml-1 h-14 w-14"
                                  size={24}
                                />
                                <div className="font-semibold">
                                  {option.label}
                                </div>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 mt-10 w-full text-center" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 3 && (
              <div
                key={currentStep}
                className={`${
                  direction === "forward"
                    ? "animate-in slide-in-from-right"
                    : "animate-in slide-in-from-left"
                } duration-300 ease-in-out`}
              >
                <div className="text-center mb-4 xl:mb-20">
                  <h1 className="text-3xl font-bold mb-4 text-white">
                    Enter Your Weight
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-10 items-center gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Weight"
                            {...field}
                            className="bg-transparent text-3xl py-10 flex items-center text-center align-middle w-[10rem] border-x-0 border-t-0 border-b border-gray-200 rounded-none text-white focus:ring-0 focus:bg-transparent"
                          />
                        </FormControl>
                        <Controller
                          name="isWeightImperial"
                          control={form.control}
                          render={({ field }) => (
                            <CustomUnitSwitch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              leftLabel="kg"
                              rightLabel="lb"
                            />
                          )}
                        />
                      </div>
                      <FormMessage className="text-red-400 mt-10 w-full text-center" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div
                key={currentStep}
                className={`${
                  direction === "forward"
                    ? "animate-in slide-in-from-right"
                    : "animate-in slide-in-from-left"
                } duration-300 ease-in-out`}
              >
                <div className="text-center mb-4 xl:mb-20">
                  <h1 className="text-3xl font-bold mb-4 text-white">
                    Enter Your Goal Weight
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="goalWeight"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-10 items-center gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Goal Weight"
                            {...field}
                            className="bg-transparent text-3xl py-10 flex items-center text-center align-middle w-[10rem] border-x-0 border-t-0 border-b border-gray-200 rounded-none text-white focus:ring-0 focus:bg-transparent"
                          />
                        </FormControl>
                        <Controller
                          name="isGoalWeightImperial"
                          control={form.control}
                          render={({ field }) => (
                            <CustomUnitSwitch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              leftLabel="kg"
                              rightLabel="lb"
                            />
                          )}
                        />
                      </div>
                      <FormMessage className="text-red-400 mt-10 w-full text-center" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 5 && (
              <div
                key={currentStep}
                className={`${
                  direction === "forward"
                    ? "animate-in slide-in-from-right"
                    : "animate-in slide-in-from-left"
                } duration-300 ease-in-out`}
              >
                <div className="text-center mb-4 xl:mb-20">
                  <h1 className="text-3xl font-bold mb-4 text-white">
                    Select Your Activity Level
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-1 gap-4">
                          {activityLevels.map((level) => {
                            const Icon = level.icon;
                            return (
                              <Button
                                key={level.value}
                                type="button"
                                className={`flex h-[4rem] items-center justify-start py-8 bg-gray-900 text-left hover:bg-gray-700 p-4 rounded-lg
                                ${
                                  field.value === level.value
                                    ? "bg-gray-800 border border-gray-600"
                                    : ""
                                }`}
                                onClick={() => field.onChange(level.value)}
                              >
                                <Icon
                                  className="mr-3 ml-1 h-14 w-14"
                                  size={24}
                                />
                                <div>
                                  <div className="font-semibold">
                                    {level.label}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {level.description}
                                  </div>
                                </div>
                              </Button>
                            );
                          })}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentStep === 6 && (
              <div
                key={currentStep}
                className={`${
                  direction === "forward"
                    ? "animate-in slide-in-from-right"
                    : "animate-in slide-in-from-left"
                } duration-300 ease-in-out`}
              >
                <div className="text-center mb-4 xl:mb-20">
                  <h1 className="text-3xl font-bold mb-4 text-white">
                    Enter Your Goal Timeline
                  </h1>
                </div>
                <FormField
                  control={form.control}
                  name="timelineWeeks"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col space-y-10 items-center gap-2">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Weeks"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                            className="bg-transparent text-3xl py-10 flex items-center text-center align-middle w-[10rem] border-x-0 border-t-0 border-b border-gray-200 rounded-none text-white focus:ring-0 focus:bg-transparent"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-red-400 mt-10 w-full text-center" />
                    </FormItem>
                  )}
                />
                {calculatedCalories !== null && (
                  <p className="text-white text-center mt-4">
                    Recommended daily calorie intake: {calculatedCalories}{" "}
                    calories
                  </p>
                )}
              </div>
            )}

            {currentStep === 7 && calculatedCalories !== null && (
              <div
                key={currentStep}
                className={`${
                  direction === "forward"
                    ? "animate-in slide-in-from-right"
                    : "animate-in slide-in-from-left"
                } duration-300 ease-in-out`}
              >
                <div className="text-center mb-4 xl:mb-20">
                  <h1 className="text-3xl font-bold mb-4 text-white">
                    Adjust Your Macronutrient Goals
                  </h1>
                </div>
                <div className="space-y-6">
                  {["protein", "carbs", "fat"].map((nutrient) => (
                    <FormField
                      key={nutrient}
                      control={form.control}
                      name={nutrient as "protein" | "carbs" | "fat"}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-2 items-center">
                            <label className="text-white capitalize">
                              {nutrient}: {field.value}g
                            </label>
                            <FormControl>
                              <Slider
                                min={0}
                                max={calculatedCalories / 6}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) =>
                                  field.onChange(value[0])
                                }
                                className="w-[200px]"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="text-red-400 mt-2 w-full text-center" />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <p className="text-white text-center mt-4">
                  Total calories from macros: {totalCalories.toFixed(0)}
                </p>
                {Math.abs(totalCalories - calculatedCalories) <= 50 ? (
                  <p className="text-green-400 text-center mt-2">
                    Your macronutrient distribution is within the acceptable
                    range.
                  </p>
                ) : (
                  <p className="text-yellow-400 text-center mt-2">
                    Adjust your macronutrients to be within ±50 calories of your
                    daily goal.
                  </p>
                )}
              </div>
            )}
          </div>
        </form>
      </Form>
      <div className="absolute bottom-0 py-4 w-full px-4 left-1/2 transform -translate-x-1/2">
        <Button
          variant="white"
          type={currentStep === 7 ? "submit" : "button"}
          className="w-[100%] h-12"
          onClick={
            currentStep === 7 ? form.handleSubmit(onSubmit) : handleNextStep
          }
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : currentStep === 7 ? (
            "Submit"
          ) : (
            "Continue"
          )}
        </Button>
      </div>{" "}
      <StepProgress
        currentStep={currentStep}
        totalSteps={7}
        onBack={handlePreviousStep}
        className="absolute top-0 left-0 w-full bg-gray-800 "
        progressClassName="bg-gray-800"
        indicatorClassName="bg-white"
      />
      <style jsx global>{`
        /* Hide spinner for Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Hide spinner for Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
