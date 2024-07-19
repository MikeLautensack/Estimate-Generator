import { NextRequest, NextResponse } from "next/server";
import { customers } from "../../../../../../db/schemas/customers";
import { db } from "../../../../../../db";
import { Customers } from "@/types/customers";
import { eq } from "drizzle-orm";
import { auth } from "../../../../../../../auth";
import { users } from "@/db/schemas/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { user_id: string; customer_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Customers;

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Create customer
  const customer = {
    id: parseInt(params.customer_id),
    contractor_user_id: parseInt(params.user_id),
    customer_user_id: bodyData.customer_user_id,
    address: bodyData.address,
    email: bodyData.email,
    name: bodyData.name,
    phone: bodyData.phone,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Create customer user request options object
  const createCustomerUserReqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: bodyData.name,
      email: bodyData.email,
      password: `${params.customer_id}${params.user_id}`,
      role: "customer",
    }),
  };

  try {
    await db.insert(customers).values(customer);
    const createCustomerUserRes = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/users/${bodyData.customer_user_id}`,
      createCustomerUserReqOptions,
    );
    const customerUser = await createCustomerUserRes.json();
    return NextResponse.json(
      {
        message: "Customer successfully created",
        customer: customer,
        customerUser: customerUser.user,
      },
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
  const session = await auth();

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
    const customerUser = await db
      .update(users)
      .set({
        email: bodyData.email,
        name: bodyData.name,
        updatedAt: new Date(),
      })
      .where(eq(users.id, bodyData.customer_user_id));
    return NextResponse.json(
      {
        message: "Customer successfully updated",
        updatedCustomer: customer,
        updatedCustomerUser: customerUser,
      },
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
  const session = await auth();

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
