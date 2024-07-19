import NewCustomerEmail from "@/emails/NewCustomerEmail";
import NewEstimateEmail from "@/emails/NewEstimateEmail";
import UpdatedEstimateEmail from "@/emails/UpdatedEstimateEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(
    request: NextRequest,
  ) {

    // Get request body data
  const bodyData = (await request.json());
    // Instanciate resend
const resend = new Resend(process.env.EMAIL_KEY);

let react = NewCustomerEmail;

  switch (bodyData.emailType) {
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
    from: bodyData.from,
    to: [bodyData.identifier],
    subject: bodyData.subject,
    react: react({
      url: bodyData.url,
      host: bodyData.host,
      customerName: bodyData.customerName,
      contractorName: bodyData.contractorName,
    }),
  });
  return NextResponse.json(
    {
      message: "Email sent!",
    },
    { status: 200 },
  );
} catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
}
  }