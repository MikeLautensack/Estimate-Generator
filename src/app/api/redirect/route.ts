import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../utils/authOptions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  const searchParams = request.nextUrl.searchParams;
  const flag = searchParams.get("redirect-flag");
  const id = searchParams.get("estimate-id");
  const newUser = searchParams.get("newUser");

  if (session.user.role === "admin") {
    return NextResponse.redirect(
      new URL("http://localhost:3000/admin-dashboard"),
    );
  } else if (session.user.role === "contractor") {
    if (newUser === "true") {
      return NextResponse.redirect(
        new URL("http://localhost:3000/new-user/create-profile"),
      );
    } else {
      return NextResponse.redirect(
        new URL("http://localhost:3000/contractor-dashboard"),
      );
    }
  } else if (session.user.role === "customer") {
    if (flag == "new-customer") {
      return NextResponse.redirect(
        new URL("http://localhost:3000/customer-dashboard"),
      );
    } else if (flag == "new-estimate") {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/customer-dashboard/estimates/${id}`),
      );
    } else if (flag == "updated-estimate") {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/customer-dashboard/estimates/${id}`),
      );
    }
  }
  return new NextResponse("redirecting...");
}
