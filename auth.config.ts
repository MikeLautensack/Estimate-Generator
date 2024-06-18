import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./src/db/index";
import { users } from "./src//db/schemas/auth";
import { eq } from "drizzle-orm";
import EmailProvider from "next-auth/providers/email";
import sendVerificationRequest from "./src/utils/sendVerificationRequest";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { NextAuthConfig, User } from "next-auth";
var bcrypt = require('bcryptjs');

export default { 
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: {
                label: "Password",
                type: "password",
                placeholder: "password",
              },
            },

            async authorize(credentials) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)
              const { email, password } = credentials as {
                email: string;
                password: string;
              };
              const res = await db.select().from(users).where(eq(users.email, email));
              const user = res[0];
              if (!user) {
                throw new Error("Email not found");
              }
              const passMatch = await bcrypt.compare(
                password,
                user.password as string,
              );

              if (!passMatch) {
                throw new Error("Invalid password");
              }
              if (passMatch) {
                return user;
              }
              // Return null if user data could not be retrieved
              return null;
            },
        }),
        // EmailProvider({
        //   server: process.env.EMAIL_SERVER,
        //   from: process.env.EMAIL_FROM,
        //   sendVerificationRequest,
        // }),
    ], 
    callbacks: {
        session({ session, token }: { session: Session; token: JWT }) {
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              role: token.role,
            } as User,
          };
        },

        jwt({ token, user }: { token: JWT; user: User }) {
          if (user) {
            return {
              ...token,
              id: user.id,
              role: user.role,
            };
          }
          return token;
        },

        // async signIn({ user, account, profile, email, credentials }) {
        //   if (user) {
        //     return process.env.NEXT_PUBLIC_SIGN_IN_CALLBACK_URL!;
        //   } else {
        //     // Return false to display a default error message
        //     return false;
        //     // Or you can return a URL to redirect to:
        //     // return '/unauthorized'
        //   }
        // },
    }, 
} satisfies NextAuthConfig