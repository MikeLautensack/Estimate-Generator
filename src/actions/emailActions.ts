'use server';

import NewCustomerEmail from "@/emails/NewCustomerEmail";
import NewEstimateEmail from "@/emails/NewEstimateEmail";
import UpdatedEstimateEmail from "@/emails/UpdatedEstimateEmail";
import { Resend } from "resend";

export const sendEmail = async (
    identifier: string,
    from: string,
    subject: string,
    host: string,
    url: string,
    customerName: string,
    contractorName: string,
    emailType: string
) => {
// Instanciate resend
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

// Send email
try {
  await resend.emails.send({
    from: from,
    to: [identifier],
    subject: subject,
    react: react({
      url,
      host,
      customerName: customerName,
      contractorName: contractorName,
    }),
  });
} catch (error: any) {
  return error;
}
}