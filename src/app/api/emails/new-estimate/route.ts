import { sendEmail } from "@/utils/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import NewEstimateEmail from "@/emails/NewEstimateEmail";
import { auth } from "../../../../../auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Get request body data
  const bodyData = await request.json();

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Send email
  try {
    await sendEmail(
      bodyData.identifier,
      bodyData.from,
      bodyData.subject,
      bodyData.host,
      bodyData.url,
      bodyData.customerName,
      bodyData.contractorName,
      NewEstimateEmail,
    );
    return NextResponse.json(
      { message: "New estimate email sent successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
