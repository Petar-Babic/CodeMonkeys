import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import "next-auth";
import { backendUrl } from "@/data/backendUrl";
import { users } from "@/data/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    accessToken: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken?: string;
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

        if (credentials.email === "luka.kordic.zg@gmail.com") {
          return {
            id: users[0].id,
            email: users[0].email,
            name: users[0].name,
            role: users[0].role,
          };
        } else {
          return null;
        }
        // Make a request to your Java Spring backend to authenticate the user
        // const response = await fetch(
        //   `${process.env.BACKEND_URL}/api/auth/login`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       email: credentials.email,
        //       password: credentials.password,
        //     }),
        //   }
        // );

        // console.log(response);

        // if (!response.ok) {
        //   return null;
        // }

        // const user = await response.json();

        // return {
        //   id: user.id,
        //   email: user.email,
        //   name: user.name,
        //   role: user.role,
        // };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
    error: "/error",
    verifyRequest: "/verify-request",
    newUser: "/sign-up",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },
    async signIn({ user, account, profile }) {
      // if (account?.provider === "google" || account?.provider === "facebook") {
      // Make a request to your Java Spring backend to create or authenticate the user
      // const response = await fetch(`${backendUrl}/auth/social-login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     provider: account.provider,
      //     providerId: account.providerAccountId,
      //     email: profile?.email,
      //     name: profile?.name,
      //     image: profile?.image,
      //   }),
      // });
      // if (!response.ok) {
      //   return false;
      // }
      // const userData = await response.json();
      // user.id = userData.id;
      // user.role = userData.role;
      // }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
