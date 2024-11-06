export type TrainerBase = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTrainerInput = Omit<
  TrainerBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateTrainerInput = Partial<
  Omit<TrainerBase, "createdAt" | "updatedAt">
> & { id: string };
