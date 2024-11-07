import { UserBase } from "./user";
import { SessionWithRelations } from "./session";
import { SignInResponse } from "next-auth/react";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  user: UserBase;
  session: SessionWithRelations;
};

export type AuthState = {
  user: UserBase | null;
  session: SessionWithRelations | null;
  isAuthenticated: boolean;
};

export type AuthActions = {
  login: (credentials: LoginCredentials) => Promise<SignInResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => void;
  setUser: (user: UserBase | null) => void;
  loading: boolean;
  getNutritionPlan: (userId: string) => Promise<boolean>;
  socialLogin: (provider: string) => Promise<SignInResponse>;
};

export type AuthContextType = AuthState & AuthActions;
