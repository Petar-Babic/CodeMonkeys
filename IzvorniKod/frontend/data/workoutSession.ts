import { WorkoutSessionWithPerformedExercises } from "@/types/workoutSession";

export const workoutSessions: WorkoutSessionWithPerformedExercises[] = [
  {
    id: "1",
    userId: "1",
    workoutId: "workout1",
    date: new Date(),
    performedExercises: [
      {
        id: "1",
        workoutSessionId: "1",
        exerciseId: "1",
        performedSets: [
          {
            id: "1",
            performedExerciseId: "1",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "2",
            performedExerciseId: "1",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
      {
        id: "2",
        workoutSessionId: "1",
        exerciseId: "2",
        performedSets: [
          {
            id: "3",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "4",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "5",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
    ],
  },
  {
    id: "1",
    userId: "1",
    workoutId: "workout2",
    date: new Date(new Date().setDate(new Date().getDate() - 6)),
    performedExercises: [
      {
        id: "1",
        workoutSessionId: "1",
        exerciseId: "1",
        performedSets: [
          {
            id: "1",
            performedExerciseId: "1",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "2",
            performedExerciseId: "1",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
      {
        id: "2",
        workoutSessionId: "1",
        exerciseId: "2",
        performedSets: [
          {
            id: "3",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "4",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "5",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    userId: "1",
    workoutId: "workout1",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    performedExercises: [
      {
        id: "1",
        workoutSessionId: "1",
        exerciseId: "1",
        performedSets: [
          {
            id: "1",
            performedExerciseId: "1",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "2",
            performedExerciseId: "1",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
      {
        id: "2",
        workoutSessionId: "1",
        exerciseId: "2",
        performedSets: [
          {
            id: "3",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "4",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: "5",
            performedExerciseId: "2",
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
    ],
  },
];
