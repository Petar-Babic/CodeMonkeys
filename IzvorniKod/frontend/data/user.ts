import { UserBase } from "@/types/user";
import { Role, Gender, ActivityLevel } from "@/types/user";

export const users: UserBase[] = [
  {
    id: 1,
    name: "Luka Kordić",
    email: "luka.kordic.zg@gmail.com",
    emailVerified: new Date("2023-01-01"),
    role: Role.USER,
    gender: Gender.MALE,
    currentNutritionPlanId: 1,
    trainerId: 1,
    bodyMeasurementIds: [],
    goalBodyMeasurementIds: [],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    emailVerified: new Date("2023-01-15"),
    role: Role.USER,
    gender: Gender.FEMALE,
    currentNutritionPlanId: 2,
    trainerId: 2,
    bodyMeasurementIds: [],
    goalBodyMeasurementIds: [],
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    emailVerified: new Date("2023-02-01"),
    role: Role.USER,
    gender: Gender.MALE,
    currentNutritionPlanId: 3,
    trainerId: 3,
    bodyMeasurementIds: [],
    goalBodyMeasurementIds: [],
  },
  {
    id: 4,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    emailVerified: new Date("2023-01-05"),
    role: Role.TRAINER,
    gender: Gender.FEMALE,
    bodyMeasurementIds: [],
    goalBodyMeasurementIds: [],
  },
  {
    id: 5,
    name: "Admin User",
    email: "admin@example.com",
    emailVerified: new Date("2023-01-01"),
    role: Role.ADMIN,
    bodyMeasurementIds: [],
    goalBodyMeasurementIds: [],
  },
];
