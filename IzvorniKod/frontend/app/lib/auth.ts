import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { SessionWithRelations } from "@/types/session";
import "next-auth";
import { Session } from "next-auth";
import { backendUrl } from "@/data/backendUrl";

declare module "next-auth" {
  interface Session extends SessionWithRelations {
    accessToken: string;
    refreshToken?: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      provider?: string;
      image?: string;
    };
  }

  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    accessToken?: string;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    role: string;
    accessToken?: string;
    provider?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(`${backendUrl}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();
          console.log(data);

          // i will delete this later
          // i just want to test the Post/ api/auth/refresh

          return {
            id: data.id,
            email: data.email,
            name: data.name,
            role: data.role,
            accessToken: data.token,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "email,public_profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          // Raspakiranje OAuth tokena na frontendu
          if (!profile) {
            console.error("Profile is undefined");
            return false;
          }

          console.log("user.image" + user?.image);

          const decodedToken = {
            oauthProvider: account.provider,
            oauthId: profile.sub || profile.email,
            email: profile.email,
            name: profile.name,
            image: user?.image,
          };

          const response = await fetch(`${backendUrl}/api/auth/oauth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(decodedToken),
          });

          if (!response.ok) {
            return false;
          }

          const data = await response.json();

          console.log(data);

          user.id = data.id;
          user.role = data.role;
          user.accessToken = data.token;
          user.provider = account.provider;
          user.email = data.email;
          user.name = data.name;
          user.image = user.image;
          return true;
        } catch (error) {
          console.error("OAuth authentication error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = Number(user.id);
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.provider = account?.provider;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session", session);

      session.user = {
        id: token.id,
        email: token.email as string,
        name: token.name as string,
        role: token.role,
        provider: token.provider,
        image: session.user.image,
      } as Session["user"];

      session.accessToken = token.accessToken || "";

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
