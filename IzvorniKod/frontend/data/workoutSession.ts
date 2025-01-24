import {
  WorkoutSessionWithExercisesForPage,
  WorkoutSessionWithPerformedExercises,
} from "@/types/workoutSession";
import { exercises } from "./exercise";
import { workouts } from "./workout";

export const workoutSessions: WorkoutSessionWithPerformedExercises[] = [
  {
    id: 1,
    userId: 1,
    workoutId: 1,
    date: new Date(),
    performedExercises: [
      {
        id: 1,
        workoutSessionId: 1,
        exerciseId: 1,
        performedSets: [
          {
            id: 1,
            performedExerciseId: 1,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 2,
            performedExerciseId: 1,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
      {
        id: 2,
        workoutSessionId: 1,
        exerciseId: 2,
        performedSets: [
          {
            id: 3,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 4,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 5,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
    ],
  },
  {
    id: 1,
    userId: 1,
    workoutId: 2,
    date: new Date(new Date().setDate(new Date().getDate() - 6)),
    performedExercises: [
      {
        id: 1,
        workoutSessionId: 1,
        exerciseId: 1,
        performedSets: [
          {
            id: 1,
            performedExerciseId: 1,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 2,
            performedExerciseId: 1,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
      {
        id: 2,
        workoutSessionId: 1,
        exerciseId: 2,
        performedSets: [
          {
            id: 3,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 4,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 5,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    userId: 1,
    workoutId: 1,
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    performedExercises: [
      {
        id: 1,
        workoutSessionId: 1,
        exerciseId: 1,
        performedSets: [
          {
            id: 1,
            performedExerciseId: 1,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 2,
            performedExerciseId: 1,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
      {
        id: 2,
        workoutSessionId: 1,
        exerciseId: 2,
        performedSets: [
          {
            id: 3,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 4,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
          {
            id: 5,
            performedExerciseId: 2,
            weight: 100,
            reps: 10,
            rpe: 10,
          },
        ],
      },
    ],
  },
];

export const workoutSessionsWithExercises: WorkoutSessionWithExercisesForPage[] =
  [
    {
      id: 1,
      userId: 1,
      workoutId: 1,
      date: new Date(),
      performedExercises: [
        {
          id: 1,
          workoutSessionId: 1,
          exerciseId: 1,
          performedSets: [
            {
              id: 1,
              performedExerciseId: 1,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 2,
              performedExerciseId: 1,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
          ],
        },
        {
          id: 2,
          workoutSessionId: 1,
          exerciseId: 2,
          performedSets: [
            {
              id: 3,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 4,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 5,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
          ],
        },
      ],
      exercises: exercises,
      workout: workouts[0],
    },
    {
      id: 1,
      userId: 1,
      workoutId: 2,
      date: new Date(new Date().setDate(new Date().getDate() - 6)),
      performedExercises: [
        {
          id: 1,
          workoutSessionId: 1,
          exerciseId: 1,
          performedSets: [
            {
              id: 1,
              performedExerciseId: 1,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 2,
              performedExerciseId: 1,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
          ],
        },
        {
          id: 2,
          workoutSessionId: 1,
          exerciseId: 2,
          performedSets: [
            {
              id: 3,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 4,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 5,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
          ],
        },
      ],
      exercises: exercises,
      workout: workouts[0],
    },
    {
      id: 3,
      userId: 1,
      workoutId: 1,
      date: new Date(new Date().setDate(new Date().getDate() - 3)),
      performedExercises: [
        {
          id: 1,
          workoutSessionId: 1,
          exerciseId: 1,
          performedSets: [
            {
              id: 1,
              performedExerciseId: 1,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 2,
              performedExerciseId: 1,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
          ],
        },
        {
          id: 2,
          workoutSessionId: 1,
          exerciseId: 2,
          performedSets: [
            {
              id: 3,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 4,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
            {
              id: 5,
              performedExerciseId: 2,
              weight: 100,
              reps: 10,
              rpe: 10,
            },
          ],
        },
      ],
      exercises: [],
      workout: workouts[0],
    },
  ];
