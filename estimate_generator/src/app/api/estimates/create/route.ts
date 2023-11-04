import { NextRequest, NextResponse } from 'next/server'
import { estimates } from '../../../../db/schemas/estimates'
import { db } from '../../../../db'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]/route'
import { lineItem } from '@/types/types'
import { lineItems } from '../../../../db/schemas/estimates'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const session = await getServerSession(authOptions)
    const estimateId = Math.floor(Math.random() * 100000000)
    try {
        await db.insert(estimates).values({
            id: estimateId,
            estimateName: data.estimateName,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            projectAddress: data.projectAddress,
            contractorName: data.contractorName,
            contractorAddress: data.contractorAddress,
            contractorPhone: data.contractorPhone,
            massage: data.massage,
            subtotal: data.subtotal,
            taxRate: data.taxRate,
            tax: data.tax,
            total: data.total,
            customer_id: data.customer_id,
            user_id: session.user.id
        })
        await db.insert(lineItems).values(data.lineItems.map((item: lineItem) => {
            return {
                id: Math.floor(Math.random() * 100000000),
                item: item.item,
                description: item.description,
                quantity:  item.quantity,
                rateType: item.rateType,
                price: item.price,
                amount: item.amount,
                estimate_id: estimateId
            }
        }))
        return NextResponse.json('Estimate sucsessfully created')
    } catch (error) {
        return NextResponse.json(error)
    }
}