export type SleepLogBase = {
  id: string;
  userId: string;
  date: Date;
  duration: number;
  quality: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateSleepLogInput = Omit<
  SleepLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateSleepLogInput = Partial<
  Omit<SleepLogBase, "createdAt" | "updatedAt">
> & { id: string };
