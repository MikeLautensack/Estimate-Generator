import { NextRequest, NextResponse } from "next/server";
import { EmailDipatchBody } from "@/types/email";
import { auth } from "../../../../../auth";

export async function POST(request: NextRequest) {
  // Get cookies
  const token = request.cookies.get("authjs.session-token");
  const csrf = request.cookies.get("authjs.csrf-token");
  console.log("testing get cookies in email dispatch endpoint", token, csrf);

  // Get request body data
  const bodyData = (await request.json()) as EmailDipatchBody<unknown>;

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  console.log("Email dipatch endpoint session log: ", session);

  const host = process.env.HOST;
  const emailPath = "/api/auth/signin/resend";
  const csrfPath = "/api/auth/csrf";
  const emailUrl = `${host}${emailPath}`;
  const csrfUrl = `${host}${csrfPath}`;

  try {
    const csrfRes = await fetch(csrfUrl);
    const csrf = await csrfRes.json();
    const csrfToken = csrf.csrfToken;
    console.log("csrf", csrf);
    console.log("csrfToken", csrfToken);
    const emailOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "set-cookie": `${csrf.name}=${csrf.value}`,
      },
      body: new URLSearchParams({
        email: bodyData.email,
        csrfToken: `${csrf.name}=${csrf.value}`,
        callbackUrl: bodyData.callbackUrl, // Replace with your actual callback URL
      }),
    };
    const res = await fetch(emailUrl, emailOptions);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("Error response text:", errorText);
      throw new Error(errorText);
    }

    const resData = await res.json();
    console.log("Calling signin/email from email dispatch res log:", resData);

    return NextResponse.json(
      { message: "Email dispatched", res: resData },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
