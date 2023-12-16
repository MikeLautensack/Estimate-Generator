import { NextRequest, NextResponse } from 'next/server'
import { profiles } from '../../../../../db/schemas/userProfile'
import { db } from '../../../../../db'
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../../../../utils/authOptions'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const session = await getServerSession(authOptions)
    try {
        await db.insert(profiles).values({
            id: Math.floor(Math.random() * 100000000),
            businessName: data.businessName,
            businessAddress: data.businessAddress,
            businessEmail: data.businessEmail,
            businessPhone: data.businessPhone,
            dateCreated: new Date(),
            dateUpdated: new Date(),
            user_id: session.user.id,
        })  
        return NextResponse.json('Profile sucsessfully created')
    } catch (error) {
        console.log('Request Data: ', data)
        console.log('Error: ', error)
        return NextResponse.json(error)
    }
}