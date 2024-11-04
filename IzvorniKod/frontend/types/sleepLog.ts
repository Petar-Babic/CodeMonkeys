import { UserBase } from "./user";

// SleepLog Types
export type SleepLogBase = {
  id: string;
  userId: string;
  date: Date;
  duration: number;
  quality: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SleepLogWithRelations = SleepLogBase & {
  user: UserBase; // Replace 'any' with actual User type
};

export type CreateSleepLogInput = Omit<
  SleepLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateSleepLogInput = Partial<
  Omit<SleepLogBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
