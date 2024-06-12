import NewCustomerEmail from "@/emails/NewCustomerEmail";
import NewEstimateEmail from "@/emails/NewEstimateEmail";
import UpdatedEstimateEmail from "@/emails/UpdatedEstimateEmail";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { Resend } from "resend";
import { formatName } from "./formatingFunctions";

const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier, url } = params;
  console.log("testing email, url val: ", url);
  const urlObj = new URL(url);
  const host = urlObj.host;
  const searchParams = new URLSearchParams(urlObj.search);
  const callbackUrl = searchParams.get("callbackUrl");
  const callbackUrlObj = new URL(callbackUrl as string);
  const callbackUrlSearchParams = new URLSearchParams(callbackUrlObj.search);
  const emailType = callbackUrlSearchParams.get("email-type");
  const customerName = callbackUrlSearchParams.get("customer-name");
  const contractorName = callbackUrlSearchParams.get("contractor-name");
  const fotmatedCustomerName = formatName(customerName as string);
  const fotmatedContractorName = formatName(contractorName as string);
  const resend = new Resend(process.env["EMAIL_KEY"]);

  try {
    if (emailType == "new-customer") {
      await resend.emails.send({
        from: "Testing new customer email ..... <onboarding@resend.dev>",
        to: [identifier],
        subject: `Log in to ${host}`,
        react: NewCustomerEmail({
          url,
          host,
          customerName: fotmatedCustomerName,
          contractorName: fotmatedContractorName,
        }),
      });
    } else if (emailType == "new-estimate") {
      await resend.emails.send({
        from: "Testing new estimate email ..... <onboarding@resend.dev>",
        to: [identifier],
        subject: `Log in to ${host}`,
        react: NewEstimateEmail({
          url,
          host,
          customerName: fotmatedCustomerName,
          contractorName: fotmatedContractorName,
        }),
      });
    } else if (emailType == "updated-estimate") {
      await resend.emails.send({
        from: "Testing updated estimate email ..... <onboarding@resend.dev>",
        to: [identifier],
        subject: `Log in to ${host}`,
        react: UpdatedEstimateEmail({
          url,
          host,
          customerName: fotmatedCustomerName,
          contractorName: fotmatedContractorName,
        }),
      });
    }
  } catch (error) {
    throw new Error("Failed to send the verification email.");
  }
};

export default sendVerificationRequest;
