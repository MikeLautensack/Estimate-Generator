import { NextResponse } from 'next/server'
import { db } from '../../../../db'
import { estimates } from '../../../../db/schemas/estimates'
import { lineItems } from '../../../../db/schemas/estimates'
import { eq } from "drizzle-orm"
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]/route'

export async function PUT(request: Request) {
    const data = await request.json()
    const session = await getServerSession(authOptions)
    try {
        await db
        return NextResponse.json('Profile sucsussfully updated')
    } catch (error) {
        return NextResponse.json(error)
    }
}