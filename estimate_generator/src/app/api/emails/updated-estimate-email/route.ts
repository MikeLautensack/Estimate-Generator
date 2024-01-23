import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import UpdatedEstimateEmail from '../../../../emails/UpdatedEstimateEmail'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const resend = new Resend(process.env["EMAIL_KEY"])
    try {
        const email = await resend.emails.send({
            from: 'Testing new updated estimate email ... <onboarding@resend.dev>',
            to: [data.customerEmail],
            subject: `Log in to ${data.host}`,
            react: UpdatedEstimateEmail({ url: data.url, host: data.host })
        })
    } catch (error) {
        throw new Error('Failed to send the updated estimate email.')
    }
    return NextResponse.json({})
}