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
import { usePathname, useRouter } from "next/navigation";
import { users } from "@/data/user";
import { accounts } from "@/data/account";

// Simulated API call for login
const loginAPI = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find user by email
  const user = users.find((u) => u.email === credentials.email);

  if (user) {
    // In a real application, you would check the password here
    // For this simulation, we're assuming the password is correct if the user is found

    // Find the corresponding account
    const account = accounts.find((a) => a.userId === user.id);

    if (account) {
      const session: SessionWithRelations = {
        id: "session-" + Date.now(),
        sessionToken:
          account.access_token ||
          "token-" + Math.random().toString(36).substr(2, 9),
        userId: user.id,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        user: user,
      };
      return { user, session };
    }
  }

  throw new Error("Invalid credentials");
};

// Simulated API call for sign up
const signUpAPI = async (
  credentials: SignUpCredentials
): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if user already exists
  if (users.some((u) => u.email === credentials.email)) {
    throw new Error("User already exists");
  }

  // Create new user
  const newUser: UserBase = {
    id: "user-" + Date.now(),
    name: credentials.name,
    email: credentials.email,
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // In a real application, you would add the new user to the database here
  // For this simulation, we're just creating a session

  const session: SessionWithRelations = {
    id: "session-" + Date.now(),
    sessionToken: "token-" + Math.random().toString(36).substr(2, 9),
    userId: newUser.id,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    user: newUser,
  };

  return { user: newUser, session };
};

export function useAuth(): AuthState & AuthActions {
  const [user, setUser] = useState<UserBase | null>(null);
  const [session, setSession] = useState<SessionWithRelations | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("User:", user);
  }, [user]);
  useEffect(() => {
    console.log("loading:", loading);
  }, [loading]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const sessionData = localStorage.getItem("session");

        if (sessionData) {
          const parsedSession = JSON.parse(sessionData) as SessionWithRelations;

          // Verify if the user in the session exists in our user data
          const existingUser = users.find(
            (u) => u.id === parsedSession.user.id
          );

          if (existingUser) {
            setSession(parsedSession);
            setUser(existingUser);
            setIsAuthenticated(true);

            if (pathname === "/sign-in" || pathname === "/sign-up") {
              router.push("/workouts");
            }
          } else {
            // If user doesn't exist, clear the invalid session
            localStorage.removeItem("session");
            setIsAuthenticated(false);
            router.push("/sign-in");
          }
        } else {
          setIsAuthenticated(false);
          router.push("/sign-in");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
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
    },
    [router]
  );

  const signUp = useCallback(
    async (credentials: SignUpCredentials) => {
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
    },
    [router]
  );

  const logout = useCallback(() => {
    setUser(null);
    setSession(null);
    setIsAuthenticated(false);
    localStorage.removeItem("session");
    router.push("/sign-in");
  }, [router]);

  return {
    user,
    session,
    isAuthenticated,
    login,
    signUp,
    logout,
    setSession,
    setUser,
    loading,
  };
}
