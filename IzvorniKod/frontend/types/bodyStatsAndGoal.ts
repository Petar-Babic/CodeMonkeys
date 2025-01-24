import { ActivityLevel, Gender } from "./user";

export type BodyStatsAndGoalDataType = {
  userId: number;
  height: number;
  weight: number;
  goalWeight: number;
  activityLevel: ActivityLevel;
  isWeightImperial: boolean;
  isHeightImperial: boolean;
  isGoalWeightImperial: boolean;
  gender: Gender;
  timelineWeeks: number;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  createdAt: Date;
  updatedAt: Date;
};
