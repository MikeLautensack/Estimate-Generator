import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET(request: NextRequest) {
  const session = await auth();

  const searchParams = request.nextUrl.searchParams;
  const flag = searchParams.get("redirect-flag");
  const id = searchParams.get("estimate-id");
  const newUser = searchParams.get("newUser");

  if (session?.user.role === "admin") {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_HOST}admin-dashboard`),
    );
  } else if (session?.user.role === "contractor") {
    if (newUser === "true") {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/new-contractor-profile`,
        ),
      );
    } else {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard`),
      );
    }
  } else if (session?.user.role === "customer") {
    if (flag == "new-customer") {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_HOST}customer-dashboard`),
      );
    } else if (flag == "new-estimate") {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_HOST}customer-dashboard/estimates/${id as string}`,
        ),
      );
    } else if (flag == "updated-estimate") {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_HOST}customer-dashboard/estimates/${id as string}`,
        ),
      );
    }
  }
  return new NextResponse("redirecting...");
}
