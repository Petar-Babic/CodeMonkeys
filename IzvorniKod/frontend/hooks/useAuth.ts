"use client";

import { useState, useEffect, useCallback } from "react";
import { Role, UserBase } from "@/types/user";
import { SessionWithRelations } from "@/types/session";
import {
  LoginCredentials,
  SignUpCredentials,
  LoginResponse,
  AuthState,
  AuthActions,
} from "@/types/auth";
import { useRouter } from "next/navigation";

// Simulated API call for login
const loginAPI = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated login logic (replace with actual API call)
  if (
    credentials.email === "johndoe@example.com" &&
    credentials.password === "johnjohn"
  ) {
    const user: UserBase = {
      id: "user-" + Date.now(),
      name: "John Doe",
      email: credentials.email,
      emailVerified: new Date(),
      image: null,
      role: Role.USER,
      height: null,
      weight: null,
      gender: null,
      activityLevel: null,
      currentNutritionPlanId: null,
      trainerId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const session: SessionWithRelations = {
      id: "session-" + Date.now(),
      sessionToken: "token-" + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      user: user,
    };
    return { user, session };
  } else {
    throw new Error("Invalid credentials");
  }
};

// Simulated API call for sign up
const signUpAPI = async (
  credentials: SignUpCredentials
): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated sign up logic (replace with actual API call)
  const user: UserBase = {
    id: "user-" + Date.now(),
    name: credentials.name,
    email: credentials.email,
    emailVerified: null,
    image: null,
    role: Role.USER,
    height: null,
    weight: null,
    gender: null,
    activityLevel: null,
    currentNutritionPlanId: null,
    trainerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const session: SessionWithRelations = {
    id: "session-" + Date.now(),
    sessionToken: "token-" + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    user: user,
  };
  return { user, session };
};

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<UserBase | null>(null);
  const [session, setSession] = useState<SessionWithRelations | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const sessionData = localStorage.getItem("session");
        if (sessionData) {
          const parsedSession = JSON.parse(sessionData) as SessionWithRelations;
          setSession(parsedSession);
          setUser(parsedSession.user);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    };

    loadInitialData();
  }, [router]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { user, session } = await loginAPI(credentials);
      setUser(user);
      setSession(session);
      setIsAuthenticated(true);
      localStorage.setItem("session", JSON.stringify(session));
      return session;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    try {
      const { user, session } = await signUpAPI(credentials);
      setUser(user);
      setSession(session);
      setIsAuthenticated(true);
      localStorage.setItem("session", JSON.stringify(session));
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
    localStorage.removeItem("session");
  }, []);

  return {
    user,
    session,
    isAuthenticated,
    login,
    signUp,
    logout,
    setSession,
    setUser,
  };
}
