import { sendEmail } from "@/actions/emailActions";

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


  

  try {
    // sendEmail(identifier, `... <onboarding@resend.dev>`, emailType === "new-customer"
    //   ? `${contractorName} has added you as a new customer`
    //   : emailType === "new-estimate"
    //     ? `${contractorName} has created a new estimate for you`
    //     : emailType === "updated-estimate"
    //       ? `${contractorName} has updated one of your estimates`
    //       : `New email from ${contractorName}`, host, url, customerName!, contractorName!, emailType!)
          await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/emails`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                identifier: identifier,
                from: `... <onboarding@resend.dev>`,
                subject: emailType === "new-customer"
                ? `${contractorName} has added you as a new customer`
                : emailType === "new-estimate"
                  ? `${contractorName} has created a new estimate for you`
                  : emailType === "updated-estimate"
                    ? `${contractorName} has updated one of your estimates`
                    : `New email from ${contractorName}`,
                host: host,
                url: url,
                customerName: customerName,
                contractorName: contractorName,
                emailType: emailType
              }),
            },
          );
  } catch (error: any) {
    throw new Error("Failed to send the verification email.", error);
  }
};

export default sendVerificationRequest;
