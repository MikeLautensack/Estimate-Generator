import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { estimates } from '../../../../../db/schemas/estimates'
import { lineItems } from '../../../../../db/schemas/estimates'
import { lineItem } from '@/types/types'
import { eq } from "drizzle-orm"

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const data = await request.json()
    try {
        await db.update(estimates)
                .set({
                    estimateName: data.estimateName,
                    customerName: data.customerName,
                    customerEmail: data.customerBusinessName,
                    projectAddress: data.projectAddress,
                    contractorName: data.contractorName,
                    contractorAddress: data.contractorAddress,
                    contractorPhone: data.contractorPhone,
                    message: data.message,
                    subtotal: data.subtotal,
                    taxRate: data.taxRate,
                    tax: data.tax,
                    total: data.total,
                    status: data.status
                })
                .where(eq(estimates.id, parseInt(params.id)))

        await db.delete(lineItems)
                .where(eq(lineItems.estimate_id, parseInt(params.id)))

        await db.insert(lineItems)
                .values(data.lineItems.map((item: lineItem) => {
                    return {
                        id: Math.floor(Math.random() * 100000000),
                        item: item.item,
                        description: item.description,
                        quantity:  item.quantity,
                        rateType: item.rateType,
                        price: item.price,
                        amount: item.amount,
                        estimate_id: params.id
                    }
                }))
        return NextResponse.json('Estimate sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}