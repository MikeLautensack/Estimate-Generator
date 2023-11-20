import EstimateEmail from "@/emails/EstimateEmail"
import { SendVerificationRequestParams } from "next-auth/providers/email"
import { Resend } from "resend"

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
    const { identifier, url, provider, theme } = params
    const { host } = new URL(url)
    const resend = new Resend(process.env["EMAIL_KEY"])

    try {
        const data = await resend.emails.send({
            from: 'Testing react email ..... <onboarding@resend.dev>',
            to: [identifier],
            subject: `Log in to ${host}`,
            text: text({ url, host }),
            react: EstimateEmail({ url, host })
        })
    } catch (error) {
        throw new Error('Failed to send the verification email.')
    }

}

function text({ url, host }: emailProps) {
    return `Sign in to ${host}\n${url}\n\n`
}