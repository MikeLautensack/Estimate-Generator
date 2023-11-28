import { NextRequest, NextResponse } from 'next/server'
import { eq } from "drizzle-orm"
import { db } from '../../../../../db'
import { changeOrders } from '@/db/schemas/changeOrders'

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json()
        await db.update(changeOrders)
                .set({
                    estimateName: data.estimateName,
                    description: data.description,
                    customerName: data.customerName,
                    workAddress: data.workAddress,
                    status: data.status
                })
                .where(eq(changeOrders.id, parseInt(params.id)))
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}