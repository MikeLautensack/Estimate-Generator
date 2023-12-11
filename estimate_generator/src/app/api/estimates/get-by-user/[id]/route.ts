import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { estimates, lineItems } from '../../../../../db/schemas/estimates'
import { eq } from "drizzle-orm"

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const query = await db.select()
                              .from(estimates)
                              .where(eq(estimates.contractor_user_id, parseInt(params.id)))
        return NextResponse.json(query)
    } catch (error) {
        return NextResponse.json(error)
    }
}