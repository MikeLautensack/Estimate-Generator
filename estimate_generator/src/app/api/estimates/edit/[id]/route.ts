import { NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { estimates } from '../../../../../db/schemas/estimates'
import { lineItems } from '../../../../../db/schemas/estimates'
import { lineItem } from '@/types/types'
import { eq } from "drizzle-orm"

export async function PUT(
    request: NextResponse,
    { params }: { params: { id: string } }
) {
    const data = await request.json()
    try {
        await db.update(estimates)
                .set({
                    estimate_name: data.estimateName,
                    customer_name: data.customerName,
                    customer_email: data.customerBusinessName,
                    project_address: data.projectAddress,
                    contractor_name: data.contractorName,
                    contractor_address: data.contractorAddress,
                    contractor_phone: data.contractorPhone,
                    massage: data.massage,
                    subtotal: data.subtotal,
                    tax_rate: data.taxRate,
                    tax: data.tax,
                    total: data.total,
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
                        rate_type: item.rateType,
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