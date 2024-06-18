import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schemas/auth";
import { Users } from "@/types/users";
import { generateValidationToken } from "@/utils/generateValidationToken";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  // Get email from request body
  const { email } = await request.json() as Users;

  // Generate verification token from email
  const token = generateValidationToken(email);

  // Instanciate resend
  const resend = new Resend(process.env["EMAIL_KEY"]);

  // Chekc user
  try {
    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, email));

    // Check if user exist
    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          user: user,
        },
        { status: 404 },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email
  try {
    // await resend.emails.send({
    //   from: "Estimate Generator LLC<onboarding@resend.dev>",
    //   to: [email],
    //   subject: `Reset Password ${host}`,
    //   react: NewCustomerEmail({
    //     url,
    //     host,
    //     customerName: fotmatedCustomerName,
    //     contractorName: fotmatedContractorName,
    //   }),
    // });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Insert token into DB
  try {
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create the reset password URL

  // Render the email template

  // Send the email
}
