export type TrainerBase = {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTrainerInput = Omit<
  TrainerBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTrainerInput = Partial<
  Omit<TrainerBase, "createdAt" | "updatedAt">
> & { id: number };
