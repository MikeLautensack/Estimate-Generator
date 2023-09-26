import { NextResponse } from 'next/server'
import { db } from '../../../../db'
import { users } from '../../../../db/schemas/auth'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    const allUsers = await db.select().from(users)
    const data = await request.json()
    allUsers.map((user) => {
        if(user.email === data.email) {
            return NextResponse.json({ error: 'User already registered' }, { status: 500 })
        }
    })
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