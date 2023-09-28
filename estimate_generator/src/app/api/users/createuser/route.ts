import { NextResponse } from 'next/server'
import { db } from '../../../../db'
import { users } from '../../../../db/schemas/auth'
import bcrypt from 'bcrypt'
import { eq, lt, gte, ne } from "drizzle-orm"

export async function POST(request: Request) {
    const data = await request.json()
    const existingUser = await db
    .select()
    .from(users)
    .where(eq(data.email, users.email));

    console.log(existingUser.length)
    console.log(data.email)

    if (existingUser.length === 1) {
        return NextResponse.json({ error: 'User already registered' }, { status: 501 });
    }

    await db.insert(users).values({
        id: Math.random().toString(),
        name: data.name,
        email: data.email,
        password: bcrypt.hashSync(data.password, 10),
        emailVerified: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return NextResponse.json('User successfully registered')
}