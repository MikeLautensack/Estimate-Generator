import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { users } from "@/db/schemas/auth";
import { auth } from "../../../../../auth";
import { db } from "@/db";
import { customers, CustomersInsert } from "@/db/schemas/customers";
import CustomerService from "@/services/CustomerService";
import { fetchData } from "@/utils/fetch";

export async function POST(
  request: NextRequest,
  { params }: { params: { customer_id: string } },
) {
  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Validate Request Data
  const customer = await CustomerService.validateInsertRequest(request);

  try {
    // Insert Customer Data
    await db.insert(customers).values(customer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let customerUser;
  try {
    // Call the create user endpoint to create a user with customer role for the new customer
    const res = await fetchData(
      `${process.env.NEXT_PUBLIC_HOST}api/users/${customer.customer_user_id}`,
      "POST",
      {
        email: customer.email,
        role: "customer",
        newUser: true,
      },
    );
    customerUser = res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send Response
  return NextResponse.json(
    {
      message: "Customer successfully created",
      customer: customer,
      customerUser: customerUser,
    },
    { status: 200 },
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { user_id: string; customer_id: string } },
) {
  // Get request body data
  const bodyData = await request.json();

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
        address2: bodyData.address2,
        city: bodyData.city,
        state: bodyData.state,
        zip: bodyData.zip,
        email: bodyData.email,
        firstName: bodyData.firstName,
        lastName: bodyData.lastName,
        phone: bodyData.phone,
        updatedAt: new Date(),
      })
      .where(eq(customers.id, parseInt(params.customer_id)));
    const customerUser = await db
      .update(users)
      .set({
        email: bodyData.email,
        name: `${bodyData.firstName} ${bodyData.lastName}`,
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
