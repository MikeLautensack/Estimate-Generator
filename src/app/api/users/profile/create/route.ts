import { NextRequest, NextResponse } from "next/server";
import { profiles } from "../../../../../db/schemas/userProfile";
import { db } from "../../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../utils/authOptions";
import { Profile } from "@/types/profile";
import { Session } from "next-auth";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as Profile;
  const session = (await getServerSession(authOptions)) as Session;

  try {
    await db.insert(profiles).values({
      id: Math.floor(Math.random() * 100000000),
      user_id: session.user.id,
      businessAddress: data.businessAddress,
      businessEmail: data.businessEmail,
      businessName: data.businessName,
      businessPhone: data.businessPhone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json("Profile sucsessfully created");
  } catch (error) {
    console.log("Request Data: ", data);
    console.log("Error: ", error);
    return NextResponse.json(error);
  }
}
