import { NextRequest, NextResponse } from 'next/server'
import { customers } from '../../../../db/schemas/customers'
import { db } from '../../../../db'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../../utils/authOptions'
import { changeOrders } from '@/db/schemas/changeOrders'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const session = await getServerSession(authOptions)
    try {

        await db.insert(changeOrders)
                .values({
                    id: Math.floor(Math.random() * 100000000),
                    estimateName: data.estimateName,
                    changeOrderName: data.changeOrderName,
                    description: data.description,
                    customerName: data.customerName,
                    projectAddress: data.projectAddress,
                    status: 'Pending Approval',
                    estimate_id: data.estimate_id,
                    contractor_user_id: data.contractor_user_id,
                    customer_user_id: data.customer_user_id
                })

        return NextResponse.json('Customer sucsessfully created')
    } catch (error) {
        return NextResponse.json(error)
    }
}