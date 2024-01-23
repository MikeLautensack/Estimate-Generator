import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import NewCustomerEmail from '../../../../emails/NewCustomerEmail'

export async function POST(request: NextRequest) {
    const data = await request.json()
    const resend = new Resend(process.env["EMAIL_KEY"])
    try {
        const email = await resend.emails.send({
            from: 'Testing new customer email ..... <onboarding@resend.dev>',
            to: [data.customerEmail],
            subject: `Log in to ${data.host}`,
            react: NewCustomerEmail({ 
                url: data.url, 
                host: data.host, 
                customerName: data.customerName, 
                contractorName: data.contractorName 
            })
        })
    } catch (error) {
        throw new Error('Failed to send the new customer email.')
    }
    return NextResponse.json({})
}