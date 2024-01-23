import NewCustomerEmail from "@/emails/NewCustomerEmail"
import { SendVerificationRequestParams } from "next-auth/providers/email"
import { Resend } from "resend"

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
    const { identifier, url, provider, theme } = params
    const { host } = new URL(url)
    const resend = new Resend(process.env["EMAIL_KEY"])

    try {
        const data = await resend.emails.send({
            from: 'Testing new customer email ..... <onboarding@resend.dev>',
            to: [identifier],
            subject: `Log in to ${host}`,
            react: NewCustomerEmail({ url, host })
        })
    } catch (error) {
        throw new Error('Failed to send the verification email.')
    }

}