import NextAuth from "next-auth";
import { db } from "./src/db/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import authConfig from "./auth.config";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/db/schemas/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  ...authConfig,
});
