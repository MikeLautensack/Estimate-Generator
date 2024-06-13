import { NextRequest, NextResponse } from "next/server";
import { customers } from "../../../../../../../db/schemas/customers";
import { db } from "../../../../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../../../utils/authOptions";
import { Customers } from "@/types/customers";
import { Session } from "next-auth";
import { eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: { user_id: string; customer_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Customers;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    const customer = {
      id: params.customer_id,
      contractor_user_id: params.user_id,
      customer_user_id: bodyData.customer_user_id,
      address: bodyData.address,
      email: bodyData.email,
      name: bodyData.name,
      phone: bodyData.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(customers).values(customer);

    return NextResponse.json(
      { message: "Customer successfully created", customer: customer },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { user_id: string; customer_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Customers;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    const customer = await db
      .update(customers)
      .set({
        address: bodyData.address,
        email: bodyData.email,
        name: bodyData.name,
        phone: bodyData.phone,
        updatedAt: new Date(),
      })
      .where(eq(customers.id, parseInt(params.customer_id)));
    return NextResponse.json(
      { message: "Customer successfully updated", customer: customer },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { user_id: string; customer_id: string } },
) {
  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    await db
      .delete(customers)
      .where(eq(customers.id, parseInt(params.customer_id)));
    return NextResponse.json(
      { message: `Customer: ${params.customer_id} successfully deleted` },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
