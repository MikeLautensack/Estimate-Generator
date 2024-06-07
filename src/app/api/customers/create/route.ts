import { NextRequest, NextResponse } from "next/server";
import { customers } from "../../../../db/schemas/customers";
import { db } from "../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../utils/authOptions";
import { Customers } from "@/types/customers";
import { Session } from "next-auth";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as Customers;
  const session = (await getServerSession(authOptions)) as Session;

  try {
    await db.insert(customers).values({
      id: Math.floor(Math.random() * 100000000),
      contractor_user_id: session.user.id,
      customer_user_id: data.customer_user_id,
      address: data.address,
      email: data.email,
      name: data.name,
      phone: data.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json("Customer sucsessfully created");
  } catch (error) {
    return NextResponse.json(error);
  }
}
