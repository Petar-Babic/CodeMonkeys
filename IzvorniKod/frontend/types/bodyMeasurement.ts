export type BodyMeasurementBase = {
  id: number;
  chest?: number;
  waist?: number;
  hips?: number;
  thighs?: number;
  biceps?: number;
  weight?: number;
  height?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBodyMeasurementInput = Omit<
  BodyMeasurementBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateBodyMeasurementInput = Partial<
  Omit<BodyMeasurementBase, "createdAt" | "updatedAt">
> & { id: number };
