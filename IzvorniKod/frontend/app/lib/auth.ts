import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { SessionWithRelations } from "@/types/session";
import "next-auth";
// import { backendUrl } from "@/data/backendUrl";
import { users } from "@/data/user";

declare module "next-auth" {
  interface Session extends SessionWithRelations {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
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
        // Make a request to your Java Spring backend to auhenticate the user
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
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("Token:", token);
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken as string;

      console.log("Session:", session);
      return session;
    },
    signIn: async ({ user, account, profile }) => {
      console.log("Sign in user:", user);
      console.log("Sign in account:", account);
      console.log("Sign in profile:", profile);
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
