import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { users } from "../../../../db/schemas/auth";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Users } from "@/types/users";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as Users;
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  if (existingUser.length === 1) {
    return NextResponse.json(
      { error: "User already registered" },
      { status: 501 },
    );
  }

  const id = Math.floor(Math.random() * 100000000).toString();

  await db.insert(users).values({
    id: id,
    name: data.name,
    email: data.email,
    password:
      data.password == null || undefined
        ? null
        : bcrypt.hashSync(data.password, 10),
    newUser: true,
    role: data.role,
    emailVerified: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const newUser = await db.select().from(users).where(eq(users.id, id));

  return NextResponse.json(newUser);
}
