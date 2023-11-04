import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { estimates, lineItems } from '../../../../../db/schemas/estimates'
import { eq } from "drizzle-orm"

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await db.delete(estimates)
                .where(eq(estimates.id, parseInt(params.id)))

        await db.delete(lineItems)
                .where(eq(lineItems.estimate_id, parseInt(params.id)))
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}