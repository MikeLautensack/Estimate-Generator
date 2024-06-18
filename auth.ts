import NextAuth from "next-auth"
import { db } from "./src/db/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import authConfig from "./auth.config";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    // Configure one or more authentication providers
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/signin",
      error: "/signin",
    },
    ...authConfig,
  } satisfies NextAuthConfig)