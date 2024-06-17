import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { EmailDipatchBody } from "@/types/email";

export async function POST(request: NextRequest) {
  // Get request body data
  const bodyData = (await request.json()) as EmailDipatchBody<unknown>;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  console.log("Email dipatch endpoint session log: ", session);

  const endpoint = `/api/auth/signin/email`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: bodyData.email,
      callbackUrl: bodyData.callbackUrl,
      redirect: false,
    }),
  };

  try {
    const res = fetch(endpoint, options);
    console.log("calling signin/email from email dispatch res log: ", res);
    return NextResponse.json(
      { message: "Email dispatched", res: res },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
