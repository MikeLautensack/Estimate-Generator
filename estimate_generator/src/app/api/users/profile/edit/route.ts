import { NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { profiles } from '../../../../../db/schemas/userProfile'
import { eq } from "drizzle-orm"

export async function PUT(request: Request) {
    const data = await request.json()
    try {
        await db.update(profiles)
                .set({
                    business_name: data.businessName,
                    business_address: data.businessAddress,
                    business_email: data.businessEmail,
                    business_phone: data.businessPhone,
                })
                .where(eq(profiles.id, data.id))
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}