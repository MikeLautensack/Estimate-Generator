import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../db'
import { estimates, lineItems } from '../../../../db/schemas/estimates'
import { eq } from "drizzle-orm"

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const query = await db.select()
                .from(estimates)
                .innerJoin(lineItems, eq(estimates.id, lineItems.estimate_id))
        console.log(params)
        return NextResponse.json(query)
    } catch (error) {
        return NextResponse.json(error)
    }
}