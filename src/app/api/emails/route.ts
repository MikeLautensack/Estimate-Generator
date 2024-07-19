import NewCustomerEmail from "@/emails/NewCustomerEmail";
import NewEstimateEmail from "@/emails/NewEstimateEmail";
import UpdatedEstimateEmail from "@/emails/UpdatedEstimateEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  // Get request body data
  const bodyData = await request.json();

  // Validate the request body data
  if (
    !bodyData ||
    !bodyData.emailType ||
    !bodyData.from ||
    !bodyData.identifier ||
    !bodyData.subject
  ) {
    throw new Error("Missing required fields in the request body.");
  }

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
    default:
      throw new Error("Invalid email type.");
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
    console.error("Error sending email:", error);

    // Additional logging for debugging
    console.error("Request body:", request.body);

    return NextResponse.json(
      {
        error: error.message || "Internal Server Error",
        message: `Error: ${error.message}`,
      },
      { status: 500 },
    );
  }
}
