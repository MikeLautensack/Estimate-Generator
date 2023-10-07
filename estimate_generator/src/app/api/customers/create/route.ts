import { NextResponse } from 'next/server'
import { customers } from '../../../../db/schemas/customers'
import { db } from '../../../../db'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: Request) {
    const data = await request.json()
    const session = await getServerSession(authOptions)
    try {
        await db.insert(customers).values({
            id: Math.floor(Math.random() * 100000000),
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            user_id: session.user.id,
        })    
        return NextResponse.json('Customer sucsessfully created')
    } catch (error) {
        return NextResponse.json(error)
    }
}