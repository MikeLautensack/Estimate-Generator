import EstimateEmail from "@/emails/EstimateEmail"
import { renderAsync } from '@react-email/render'
import { SendVerificationRequestParams } from "next-auth/providers/email"
import { Resend } from "resend"

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
    const { identifier, url, provider, theme } = params
    const { host } = new URL(url)
    const resend = new Resend(process.env["EMAIL_KEY"])

    const html = await renderAsync(EstimateEmail({ url, host }))

    try {
        const data = await resend.emails.send({
            from: 'Testing react email ..... <onboarding@resend.dev>',
            to: [identifier],
            subject: `Log in to ${host}`,
            text: text({ url, host }),
            html: html
        })
    } catch (error) {
        throw new Error('Failed to send the verification email.')
    }

}

function text({ url, host }: emailProps) {
    return `Sign in to ${host}\n${url}\n\n`
}