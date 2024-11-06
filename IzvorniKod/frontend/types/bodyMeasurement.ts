<<<<<<< HEAD
import { UserBase } from "./user";

// BodyMeasurement Types
=======
>>>>>>> dev
export type BodyMeasurementBase = {
  id: string;
  userId: string;
  date: Date;
<<<<<<< HEAD
  chest: number | null;
  waist: number | null;
  hips: number | null;
  thighs: number | null;
  biceps: number | null;
=======
  chest?: number;
  waist?: number;
  hips?: number;
  thighs?: number;
  biceps?: number;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type BodyMeasurementWithRelations = BodyMeasurementBase & {
  user: UserBase; // Replace 'any' with actual User type
};

=======
>>>>>>> dev
export type CreateBodyMeasurementInput = Omit<
  BodyMeasurementBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateBodyMeasurementInput = Partial<
<<<<<<< HEAD
  Omit<BodyMeasurementBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
=======
  Omit<BodyMeasurementBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
