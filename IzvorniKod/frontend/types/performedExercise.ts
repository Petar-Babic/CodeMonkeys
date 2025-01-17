import {
  CreatePerformedSetInput,
  PerformedSetBase,
  UpdatePerformedSetInput,
} from "./performedSet";

export type PerformedExerciseBase = {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
};

export type CreatePerformedExerciseInput = Omit<
  PerformedExerciseWithPerformedSet,
  "id"
> & {
  performedSets: CreatePerformedSetInput[];
};

export type UpdatePerformedExerciseInput = Partial<PerformedExerciseBase> & {
  id: string;
  performedSets: UpdatePerformedSetInput[];
};

export type PerformedExerciseWithPerformedSet = PerformedExerciseBase & {
  performedSets: PerformedSetBase[];
};
