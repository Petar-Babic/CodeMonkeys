import {
  CreatePerformedSetInput,
  PerformedSetBase,
  UpdatePerformedSetInput,
} from "./performedSet";

export type PerformedExerciseBase = {
  id: number;
  workoutSessionId: number;
  exerciseId: number;
};

export type CreatePerformedExerciseInput = Omit<
  PerformedExerciseWithPerformedSet,
  "id"
> & {
  performedSets: CreatePerformedSetInput[];
};

export type UpdatePerformedExerciseInput = Partial<PerformedExerciseBase> & {
  id: number;
  performedSets: UpdatePerformedSetInput[];
};

export type PerformedExerciseWithPerformedSet = PerformedExerciseBase & {
  performedSets: PerformedSetBase[];
};

export type CreatePerformedExerciseWithPerformedSetInput = Omit<
  PerformedExerciseBase,
  "id"
> & {
  performedSets: CreatePerformedSetInput[];
};
