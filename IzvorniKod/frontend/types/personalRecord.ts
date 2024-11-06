<<<<<<< HEAD
import { ExerciseBase } from "./exercise";
import { UserBase } from "./user";

// PersonalRecord Types
=======
>>>>>>> dev
export type PersonalRecordBase = {
  id: string;
  userId: string;
  exerciseId: string;
  weight: number;
  reps: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

<<<<<<< HEAD
export type PersonalRecordWithRelations = PersonalRecordBase & {
  user: UserBase; // Replace 'any' with actual User type
  exercise: ExerciseBase; // Replace 'any' with actual Exercise type
};

=======
>>>>>>> dev
export type CreatePersonalRecordInput = Omit<
  PersonalRecordBase,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdatePersonalRecordInput = Partial<
<<<<<<< HEAD
  Omit<
    PersonalRecordBase,
    "id" | "userId" | "exerciseId" | "createdAt" | "updatedAt"
  >
>;
=======
  Omit<PersonalRecordBase, "createdAt" | "updatedAt">
> & { id: string };
>>>>>>> dev
