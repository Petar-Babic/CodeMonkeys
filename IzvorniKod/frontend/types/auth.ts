import { UserBase } from "./user";
import { SessionWithRelations } from "./session";

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
  login: (credentials: LoginCredentials) => Promise<SessionWithRelations>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => void;
  setSession: (session: SessionWithRelations | null) => void;
  setUser: (user: UserBase | null) => void;
  loading: boolean;
  getNutritionPlan: (userId: string) => Promise<boolean>;
};

export type AuthContextType = AuthState & AuthActions;
