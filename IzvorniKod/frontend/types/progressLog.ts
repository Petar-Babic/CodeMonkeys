import { UserBase } from "./user";

// ProgressLog Types
export type ProgressLogBase = {
  id: string;
  userId: string;
  date: Date;
  weight: number | null;
  notes: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProgressLogWithRelations = ProgressLogBase & {
  user: UserBase; // Replace 'any' with actual User type
};

export type CreateProgressLogInput = Omit<
  ProgressLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateProgressLogInput = Partial<
  Omit<ProgressLogBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
