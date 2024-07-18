import NewCustomerEmail from "@/emails/NewCustomerEmail";
import NewEstimateEmail from "@/emails/NewEstimateEmail";
import UpdatedEstimateEmail from "@/emails/UpdatedEstimateEmail";
import { Resend } from "resend";

const sendVerificationRequest = async (params: any) => {
  const { identifier, url } = params;

  const urlObj = new URL(url);
  const host = urlObj.host;
  const searchParams = new URLSearchParams(urlObj.search);
  const callbackUrl = searchParams.get("callbackUrl");
  const callbackUrlObj = new URL(callbackUrl as string);
  const callbackUrlSearchParams = new URLSearchParams(callbackUrlObj.search);
  const emailType = callbackUrlSearchParams.get("email-type");
  const customerName = callbackUrlSearchParams.get("customer-name");
  const contractorName = callbackUrlSearchParams.get("contractor-name");

  const resend = new Resend(process.env.EMAIL_KEY);

  let react = NewCustomerEmail;

  switch (emailType) {
    case "new-customer":
      react = NewCustomerEmail;
      break;
    case "new-estimate":
      react = NewEstimateEmail;
      break;
    case "updated-estimate":
      react = UpdatedEstimateEmail;
      break;
  }

  try {
    await resend.emails.send({
      from: `... <onboarding@resend.dev>`,
      to: identifier,
      subject:
        emailType === "new-customer"
          ? `${contractorName} has added you as a new customer`
          : emailType === "new-estimate"
            ? `${contractorName} has created a new estimate for you`
            : emailType === "updated-estimate"
              ? `${contractorName} has updated one of your estimates`
              : `New email from ${contractorName}`,
      react: react({
        url: url,
        host: host,
        customerName: customerName!,
        contractorName: contractorName!,
      }),
    });
  } catch (error: any) {
    throw new Error("Failed to send the verification email.", error);
  }
};

export default sendVerificationRequest;
