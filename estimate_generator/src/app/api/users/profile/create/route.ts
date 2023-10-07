import { NextResponse } from 'next/server'
import { profiles } from '../../../../../db/schemas/userProfile'
import { db } from '../../../../../db'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../auth/[...nextauth]/route'

export async function POST(request: Request) {
    const data = await request.json()
    const session = await getServerSession(authOptions)
    try {
        await db.insert(profiles).values({
            id: Math.floor(Math.random() * 100000000),
            business_name: data.businessName,
            business_address: data.businessAddress,
            business_email: data.businessEmail,
            business_phone: data.businessPhone,
            user_id: session.user.id,
        })  
        return NextResponse.json('Profile sucsessfully created')
    } catch (error) {
        console.log('Request Data: ', data)
        return NextResponse.json(error)
    }
}