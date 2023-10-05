import { NextResponse } from 'next/server'
import { customers } from '../../../../db/schemas/customers'
import { db } from '../../../../db'

export async function POST(request: Request) {
    const data = await request.json()
    try {
        await db.insert(customers).values({
            id: Math.floor(Math.random() * 100000000),
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
            user_id: data.user_id,
        })    
        return NextResponse.json('Customer sucsessfully created')
    } catch (error) {
        return NextResponse.json(error)
    }
}