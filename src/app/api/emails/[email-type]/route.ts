import { NextRequest, NextResponse } from "next/server";
import { EmailEndpointBody } from "@/types/email";
import { Resend } from "resend";
import NewCustomerEmail from "../../../../emails/NewCustomerEmail";
import NewEstimateEmail from "../../../../emails/NewEstimateEmail";
import UpdatedEstimateEmail from "../../../../emails/UpdatedEstimateEmail";
import { auth } from "../../../../../auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { "email-type": string } },
) {
  // Get request body data
  const bodyData = await request.json() as EmailEndpointBody;

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  console.log("Email sending endpoint session log: ", session);

  const resend = new Resend(process.env["EMAIL_KEY"]);

  let react = NewCustomerEmail;

  switch (params["email-type"]) {
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
      from: "Testing new email sending endpoints ..... <onboarding@resend.dev>",
      to: bodyData.email,
      subject: ``,
      react: react({
        url: bodyData.magicLink,
        host: bodyData.host,
        customerName: "customer 123",
        contractorName: "contractor 123",
      }),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse("redirecting...");
}
