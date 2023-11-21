import NextAuth, { SessionStrategy, NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { PlanetScaleAdapter } from "../../../../db/schemas/planetScaleAdapter"
import { db } from '../../../../db/index'
import { users } from '../../../../db/schemas/auth'
import { eq } from "drizzle-orm"
import EmailProvider from "next-auth/providers/email"
import { sendVerificationRequest } from '../../../../utils/sendVerificationRequest'

export const authOptions: NextAuthOptions = {
  adapter: PlanetScaleAdapter(db),
  // Configure one or more authentication providers
  providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "email" },
          password: { label: "Password", type: "password", placeholder: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const { email, password } = credentials as {
            email: string;
            password: string;
          }
          const res = await db
              .select()
              .from(users)
              .where(eq(users.email, email));
          const user = res[0]
          const passMatch = await bcrypt.compare(password, user.password!)
          
          if(passMatch) {
            return user
          }
          // Return null if user data could not be retrieved
          return null
        }
      }),
      // EmailProvider({
      //   server: process.env.EMAIL_SERVER,
      //   from: 'TEST <onboarding@resend.dev>'
      // }),
      {
        id: 'email',
        type: 'email',
        name: 'Email',
        server: {},
        from: '',
        maxAge: 24 * 60 * 60,
        options: {},
        sendVerificationRequest
      }
  ],
  session: {
    strategy: 'jwt' as SessionStrategy
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async session({ session, user, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role
        }
      }
    },
    async jwt({ token, user }: any) {
      if(user) {
        return {
          ...token,
          id: user.id,
          role: user.role
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }