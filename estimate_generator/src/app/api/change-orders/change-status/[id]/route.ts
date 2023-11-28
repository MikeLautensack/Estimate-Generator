import { NextRequest, NextResponse } from 'next/server'
import { eq } from "drizzle-orm"
import { changeOrders } from '@/db/schemas/changeOrders'
import { db } from '../../../../../db'

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const data = await request.json()
    try {
        await db.update(changeOrders)
                .set({
                    status: data.status
                })
                .where(eq(changeOrders.id, parseInt(params.id)))
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}