import { UserBase } from "./user";

// BodyMeasurement Types
export type BodyMeasurementBase = {
  id: string;
  userId: string;
  date: Date;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  thighs: number | null;
  biceps: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type BodyMeasurementWithRelations = BodyMeasurementBase & {
  user: UserBase; // Replace 'any' with actual User type
};

export type CreateBodyMeasurementInput = Omit<
  BodyMeasurementBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateBodyMeasurementInput = Partial<
  Omit<BodyMeasurementBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
