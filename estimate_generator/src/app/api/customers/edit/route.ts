import { NextResponse } from 'next/server'
import { db } from '../../../../db'
import { customers } from '../../../../db/schemas/customers'
import { eq } from "drizzle-orm"

export async function PUT(request: Request) {
    const data = await request.json()
    try {
        await db.update(customers)
                .set({
                    name: data.name,
                    address: data.address,
                    email: data.email,
                    phone: data.phone,
                })
                .where(eq(customers.id, data.id))
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}