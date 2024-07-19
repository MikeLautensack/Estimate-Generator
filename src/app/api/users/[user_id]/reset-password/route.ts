import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { profiles } from "../../../../../db/schemas/userProfile";
import { Session } from "next-auth";
import authConfig from "../../../../../../auth.config";
import { Profile } from "@/types/profile";

export async function POST(request: NextRequest) {
  // // Get request body data
  // const bodyData = (await request.json()) as Profile;
  // // Get session
  // const session = (await getServerSession(authConfig)) as Session;
  // // Check session is present
  // if (!session) {
  //   return NextResponse.json({ error: "No session" }, { status: 401 });
  // }
  // // Create profile resource
  // try {
  //   const profile = await db.insert(profiles).values({
  //     id: Math.floor(Math.random() * 100000000),
  //     user_id: session.user.id,
  //     businessAddress: bodyData.businessAddress,
  //     businessEmail: bodyData.businessEmail,
  //     businessName: bodyData.businessName,
  //     businessPhone: bodyData.businessPhone,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });
  //   return NextResponse.json(
  //     { message: "Profile successfully created", profile: profile },
  //     { status: 200 },
  //   );
  // } catch (error: any) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
}
