import { eq } from "drizzle-orm"
import { db } from "@/db"
import { NextRequest, NextResponse } from "next/server"
import { users } from "@/db/schemas/auth"

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const data = await req.json()
    try {
        await db.update(users)
                .set({
                    name: data.name,
                    email: data.email
                })
                .where(eq(users.id, params.id))
        return NextResponse.json('User deleted')
    } catch (error) {
        console.log(error)
    }
}