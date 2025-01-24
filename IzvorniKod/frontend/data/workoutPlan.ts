import { WorkoutPlanBase, WorkoutPlanWithWorkouts } from "@/types/workoutPlan";

export const workoutPlans: WorkoutPlanBase[] = [
  {
    id: 1,
    name: "Beginner Full Body Workout",
    description: "A full body workout routine for beginners",
    image: "/main-image-gym.webp",
    createdById: 1,
    userId: 1,
  },
  {
    id: 2,
    name: "Advanced Upper Body Split",
    description: "An intense upper body workout for advanced lifters",
    image: "/main-image-gym.webp",
    createdById: 1,
  },
  {
    id: 3,
    name: "Cardio and Core Blast",
    description: "A high-intensity cardio and core workout",
    image: "/main-image-gym.webp",
    createdById: 1,
  },

  {
    id: 4,
    name: "Leg Day Destroyer",
    description: "An intense lower body workout focusing on legs",
    image: "/main-image-gym.webp",
    createdById: 1,
  },

  {
    id: 5,
    name: "Yoga for Flexibility",
    description: "A yoga routine designed to improve flexibility",
    image: "/main-image-gym.webp",
    createdById: 1,
  },
];

export const workoutPlansWithWorkouts: WorkoutPlanWithWorkouts[] = [];
