import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import CustomerService from "@/services/CustomerService";

export async function POST(request: NextRequest) {
  // Get session
  const session = await auth();

  // Check session is present
  if (!session)
    return NextResponse.json({ error: "No session" }, { status: 401 });

  // Init customer variables
  let customer;
  let customerUser;

  // Validate Request Data
  try {
    customer = await CustomerService.validateInsertRequest(request);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Insert Customer
  try {
    await CustomerService.insertNewCustomer(customer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Call the create user endpoint to create a user with customer role for the new customer
  try {
    const res = await CustomerService.createNewCustomerUser(customer);
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
  { params }: { params: { customer_id: string } },
) {
  // Get session
  const session = await auth();

  // Check session is present
  if (!session)
    return NextResponse.json({ error: "No session" }, { status: 401 });

  // Init customer variables
  let customer;

  // Validate Request Data
  try {
    customer = await CustomerService.validateInsertRequest(request);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update Customer and customer user;
  try {
    CustomerService.updateCustomer(customer, params.customer_id);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return 200 when all operations completed successfully
  return NextResponse.json(
    {
      message: "Customer successfully updated",
      updatedCustomer: customer,
    },
    { status: 200 },
  );
}

export async function DELETE({ params }: { params: { customer_id: string } }) {
  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    CustomerService.deleteCustomer(params.customer_id);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return 200
  return NextResponse.json(
    { message: `Customer: ${params.customer_id} successfully deleted` },
    { status: 200 },
  );
}
