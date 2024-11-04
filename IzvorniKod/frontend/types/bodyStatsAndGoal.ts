import { ActivityLevel, Gender } from "./user";

// Define the type for the form data
export type BodyStatsAndGoalDataType = {
  height: string;
  isHeightImperial: boolean;
  weight: string;
  isWeightImperial: boolean;
  goalWeight: string;
  isGoalWeightImperial: boolean;
  activityLevel: ActivityLevel;
  calories: number;
  gender: Gender;
  timelineWeeks: number;
  protein: number;
  carbs: number;
  fat: number;
};
