"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserBase } from "@/types/user";
import { SessionWithRelations } from "@/types/session";
import {
  LoginCredentials,
  SignUpCredentials,
  AuthContextType,
} from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextContent>{children}</AuthContextContent>
    </SessionProvider>
  );
}

function AuthContextContent({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

function useAuth(): AuthContextType {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserBase | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user as UserBase);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(status === "loading");
  }, [session, status]);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<SessionWithRelations> => {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email: credentials.email,
          password: credentials.password,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        const updatedSession = await fetch("/api/auth/session");
        const sessionData = await updatedSession.json();

        if (sessionData?.user) {
          setUser(sessionData.user as UserBase);
          setIsAuthenticated(true);
          return sessionData as SessionWithRelations;
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    []
  );

  const signUp = useCallback(
    async (credentials: SignUpCredentials): Promise<void> => {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error("Sign up failed");
        }

        await login({
          email: credentials.email,
          password: credentials.password,
        });
      } catch (error) {
        console.error("Sign up failed:", error);
        throw error;
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    setUser(null);
    setIsAuthenticated(false);
    router.push("/sign-in");
  }, [router]);

  const getNutritionPlan = useCallback(
    async (userId: string): Promise<boolean> => {
      try {
        const response = await fetch(`/api/nutrition-plans/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch nutrition plan");
        }
        const data = await response.json();
        return !!data;
      } catch (error) {
        console.error("Error fetching nutrition plan:", error);
        return false;
      }
    },
    []
  );

  return {
    user,
    session: session as SessionWithRelations | null,
    isAuthenticated,
    login,
    signUp,
    logout,
    setSession: () => {}, // This is now handled by NextAuth
    setUser,
    loading,
    getNutritionPlan,
  };
}
