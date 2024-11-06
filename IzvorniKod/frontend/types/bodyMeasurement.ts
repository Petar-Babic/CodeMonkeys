export type BodyMeasurementBase = {
  id: string;
  userId: string;
  date: Date;
  chest?: number;
  waist?: number;
  hips?: number;
  thighs?: number;
  biceps?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBodyMeasurementInput = Omit<
  BodyMeasurementBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateBodyMeasurementInput = Partial<
  Omit<BodyMeasurementBase, "createdAt" | "updatedAt">
> & { id: string };
