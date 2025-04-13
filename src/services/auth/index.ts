import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth";
import { prisma } from "../database";
import { createStripeCustomer } from "../stripe";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-in",
    error: "/auth/sign-in",
    verifyRequest: "/auth/sign-in",
    newUser: "/app",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Evita redirecionar para webviews maliciosas
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.SESSION_COOKIE_NAME || "authenticationjs.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Definir como true em produção
        sameSite: "lax",
      },
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  events: {
    createUser: async (message) => {
      await createStripeCustomer({
        name: message.user.name as string,
        email: message.user.email as string,
      });
    },
  },
});
