import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { users } from "../../../../db/schemas/auth";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Users } from "@/types/users";
import { auth } from "../../../../../auth";

export async function POST(request: NextRequest,
  { params }: { params: { user_id: string } },
) {
  // Get request body data
  const bodyData = await request.json() as Users;

  // Check to make sure the bodyData has all the neccassary data
  if (
    !bodyData.name ||
    !bodyData.email ||
    !bodyData.password ||
    !bodyData.role
  ) {
    return NextResponse.json(
      {
        error: "Body data is missing fields",
        bodyData: bodyData,
      },
      { status: 400 },
    );
  }

  // Check to see if a user with the same email exists
  try {
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, bodyData.email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 },
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create user in DB
  try {
    const user = {
      id: params.user_id,
      name: bodyData.name,
      email: bodyData.email,
      password:
        bodyData.password == null || undefined
          ? null
          : bcrypt.hashSync(bodyData.password, 10),
      newUser: true,
      role: bodyData.role,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(users).values(user);
    return NextResponse.json(
      { message: "User successfully created", user: user },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("testing.-.-.-")
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { user_id: string } },
) {
  // Get request body data
  const bodyData = await request.json();

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Check id is valid
  if (params.user_id.length !== 8) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    // Update user resource
    await db
      .update(users)
      .set({
        name: bodyData.name,
        role: bodyData.role,
        newUser: bodyData.newUser,
      })
      .where(eq(users.id, params.user_id));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    // Get updated user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, params.user_id));
    return NextResponse.json(
      { message: "User successfully updated", user: user },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { user_id: string } },
) {
  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Check id is valid
  if (params.user_id.length !== 8) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  // Check to see if a user with the same email exists
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, params.user_id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete user from DB
  try {
    await db.delete(users).where(eq(users.id, params.user_id));
    return NextResponse.json(
      { message: "User successfully deleted" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
