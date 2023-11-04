import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { profiles } from '../../../../../db/schemas/userProfile'
import { eq } from "drizzle-orm"

export async function PUT(request: NextRequest) {
    const data = await request.json()
    try {
        await db.update(profiles)
                .set({
                    businessName: data.businessName,
                    businessAddress: data.businessAddress,
                    businessEmail: data.businessEmail,
                    businessPhone: data.businessPhone,
                })
                .where(eq(profiles.id, data.id))
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}