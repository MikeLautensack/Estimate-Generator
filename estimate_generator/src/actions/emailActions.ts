'use server'

import EstimateEmail from '@/emails/EstimateEmail'
import { Resend } from 'resend'

const resend = new Resend(process.env["EMAIL_KEY"])

export const sendEmail = async (from: string, to: string, subject: string) => {
    try {
        const data = await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            react: EstimateEmail()
        })
        return data
    } catch (error) {
        console.log(error)
    }
}