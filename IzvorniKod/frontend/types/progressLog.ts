<<<<<<< HEAD
import { UserBase } from "./user";

// ProgressLog Types
=======
>>>>>>> dev
export type ProgressLogBase = {
  id: string;
  userId: string;
  date: Date;
<<<<<<< HEAD
  weight: number | null;
  notes: string | null;
  imageUrl: string | null;
=======
  weight?: number;
  notes?: string;
  imageUrl?: string;
>>>>>>> dev
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type ProgressLogWithRelations = ProgressLogBase & {
  user: UserBase; // Replace 'any' with actual User type
};

=======
>>>>>>> dev
export type CreateProgressLogInput = Omit<
  ProgressLogBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateProgressLogInput = Partial<
<<<<<<< HEAD
  Omit<ProgressLogBase, "id" | "userId" | "createdAt" | "updatedAt">
>;
=======
  Omit<ProgressLogBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
