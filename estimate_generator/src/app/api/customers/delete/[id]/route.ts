import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { customers } from '../../../../../db/schemas/customers'
import { eq } from "drizzle-orm"

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await db.delete(customers)
                .where(eq(customers.id, parseInt(params.id)))
        return NextResponse.json('Customer deleted')
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}