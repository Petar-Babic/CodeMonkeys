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
  accessToken: string;
};

export type AuthState = {
  user: UserBase | null;
  session: SessionWithRelations | null;
  isAuthenticated: boolean;
  accessToken: string | null;
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

export type AuthContextType = {
  user: UserBase | null;
  session: SessionWithRelations | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<SignInResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserBase | null>>;
  loading: boolean;
  socialLogin: (provider: string) => Promise<SignInResponse>;
  getNutritionPlan: (userId: string) => Promise<boolean>;
};
