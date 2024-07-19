import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string & DefaultSession["user"];
  }

  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
