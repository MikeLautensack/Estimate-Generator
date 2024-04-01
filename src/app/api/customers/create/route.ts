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
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      contractor_user_id: session.user.id,
      customer_user_id: data.customer_user_id,
    });

    return NextResponse.json("Customer sucsessfully created");
  } catch (error) {
    return NextResponse.json(error);
  }
}
