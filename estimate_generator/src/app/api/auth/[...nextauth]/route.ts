import NextAuth, { SessionStrategy } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'
import { PlanetScaleAdapter } from "../../../../db/schemas/planetScaleAdapter"
import { db } from '../../../../db/index'
import { users } from '../../../../db/schemas/auth'
import { eq } from "drizzle-orm"
import EmailProvider from "next-auth/providers/email"
import { sendVerificationRequest } from '../../../../utils/sendVerificationRequest'
import { authOptions } from '@/utils/authOptions'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }