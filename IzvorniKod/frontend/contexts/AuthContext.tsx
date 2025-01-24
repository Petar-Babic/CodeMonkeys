"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import { signIn, SignInResponse, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserBase } from "@/types/user";
import { SessionWithRelations } from "@/types/session";
import {
  LoginCredentials,
  SignUpCredentials,
  AuthContextType,
} from "@/types/auth";
import { backendUrl } from "@/data/backendUrl";
import { SessionProvider } from "next-auth/react";

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
      console.log("Session authenticated, setting user:", session.user);
      setUser(session.user as UserBase);
      setIsAuthenticated(true);
    } else {
      console.log("Session not authenticated, clearing user");
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(status === "loading");
  }, [session, status]);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<SignInResponse> => {
      try {
        console.log("Credentials", credentials);
        const result = await signIn("credentials", {
          redirect: false,
          email: credentials.email,
          password: credentials.password,
        });

        console.log("result", result);

        if (result?.error) {
          throw new Error(result.error);
        }

        return result as SignInResponse;
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
        const response = await fetch(`${backendUrl}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        console.log("Sign up response", response);

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

  const socialLogin = useCallback(
    async (provider: string): Promise<SignInResponse> => {
      try {
        const response = await signIn(provider.toLowerCase(), {
          callbackUrl: "/workouts",
        });

        return response as SignInResponse;
      } catch (error) {
        console.error(`${provider} login failed:`, error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
    setUser(null);
    setIsAuthenticated(false);
    router.push("/sign-in");
    localStorage.clear();
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
    accessToken: session?.accessToken || null,
    refreshToken: session?.refreshToken || null,
    isAuthenticated,
    login,
    signUp,
    logout,
    setUser,
    loading,
    socialLogin,
    getNutritionPlan,
  };
}
