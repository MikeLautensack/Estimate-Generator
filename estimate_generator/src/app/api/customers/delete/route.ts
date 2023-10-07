import { NextResponse } from 'next/server'
import { db } from '../../../../db'
import { customers } from '../../../../db/schemas/customers'
import { eq } from "drizzle-orm"

export async function DELETE(request: Request) {
    const data = await request.json()
    try {
        await db.delete(customers)
                .where(eq(customers.id, 2585119))
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}