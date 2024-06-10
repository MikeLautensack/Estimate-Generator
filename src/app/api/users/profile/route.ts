import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { eq } from "drizzle-orm";
import { profiles } from "../../../../db/schemas/userProfile";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Profile } from "@/types/profile";

export async function POST(request: NextRequest) {
  // Get request body data
  const bodyData = (await request.json()) as Profile;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Create profile resource
  try {
    const profile = await db.insert(profiles).values({
      id: Math.floor(Math.random() * 100000000),
      user_id: session.user.id,
      businessAddress: bodyData.businessAddress,
      businessEmail: bodyData.businessEmail,
      businessName: bodyData.businessName,
      businessPhone: bodyData.businessPhone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json(
      { message: "Profile successfully created", profile: profile },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Profile;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Convert path var "id" to number
  const profileID = parseInt(params.id);

  // Check profileID is vaild
  if (isNaN(profileID)) {
    return NextResponse.json(
      { error: `Profile id: ${params.id} is not valid` },
      { status: 400 },
    );
  }

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Update profile resource
  try {
    const profile = await db
      .update(profiles)
      .set({
        businessAddress: bodyData.businessAddress,
        businessEmail: bodyData.businessEmail,
        businessName: bodyData.businessName,
        businessPhone: bodyData.businessPhone,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, profileID));
    return NextResponse.json(
      { message: "Profile successfully updated", profile: profile },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Convert path var "id" to number
  const profileID = parseInt(params.id);

  // Check profileID is vaild
  if (isNaN(profileID)) {
    return NextResponse.json(
      { error: `Profile id: ${params.id} is not valid` },
      { status: 400 },
    );
  }

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  //
  try {
    await db.delete(profiles).where(eq(profiles.id, profileID));
    return NextResponse.json(
      { message: "Profile successfully deleted" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
