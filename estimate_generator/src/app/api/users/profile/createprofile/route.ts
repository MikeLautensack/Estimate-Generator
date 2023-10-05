import { NextResponse } from 'next/server'
import { profiles } from '../../../../../db/schemas/userProfile'
import { db } from '../../../../../db'

export async function POST(request: Request) {
    const data = await request.json()
    try {
        await db.insert(profiles).values({
            id: Math.floor(Math.random() * 100000000),
            business_name: data.businessName,
            business_address: data.businessAddress,
            business_email: data.businessEmail,
            business_phone: data.businessPhone,
            user_id: data.user_id,
        })  
        return NextResponse.json('Profile sucsessfully created')
    } catch (error) {
        return NextResponse.json(error)
    }
}