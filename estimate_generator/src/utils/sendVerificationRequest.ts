import NewCustomerEmail from "@/emails/NewCustomerEmail"
import NewEstimateEmail from "@/emails/NewEstimateEmail"
import UpdatedEstimateEmail from "@/emails/UpdatedEstimateEmail"
import { SendVerificationRequestParams } from "next-auth/providers/email"
import { Resend } from "resend"

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
    const { identifier, url, provider, theme } = params
    const urlObj = new URL(url)
    const host = urlObj.host
    const searchParams = new URLSearchParams(urlObj.search)
    const callbackUrl = searchParams.get('callbackUrl')
    const callbackUrlObj = new URL(callbackUrl as string)
    const callbackUrlSearchParams = new URLSearchParams(callbackUrlObj.search)
    const emailType = callbackUrlSearchParams.get('email-type')
    const resend = new Resend(process.env["EMAIL_KEY"])

    try {
        if (emailType == 'newCustomer') {
            await resend.emails.send({
                from: 'Testing new customer email ..... <onboarding@resend.dev>',
                to: [identifier],
                subject: `Log in to ${host}`,
                react: NewCustomerEmail({ url, host })
            })
        } else if (emailType == 'newEstimate') {
            await resend.emails.send({
                from: 'Testing new estimate email ..... <onboarding@resend.dev>',
                to: [identifier],
                subject: `Log in to ${host}`,
                react: NewEstimateEmail({ url, host })
            })
        } else if (emailType == 'updatedEstimate') {
            await resend.emails.send({
                from: 'Testing updated estimate email ..... <onboarding@resend.dev>',
                to: [identifier],
                subject: `Log in to ${host}`,
                react: UpdatedEstimateEmail({ url, host })
            })
        }
    } catch (error) {
        throw new Error('Failed to send the verification email.')
    }

}