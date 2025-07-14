import DIContainer from "@/core/DIContainer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get authenticated user
  const user = await DIContainer.authUseCases.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  console.log(user);

  const searchParams = request.nextUrl.searchParams;
  const offset = searchParams.get("offset") || "0";
  const limit = searchParams.get("limit") || "10";

  const customers = await DIContainer.customersUseCases.getCustomers(
    user.id,
    "1",
    "10",
    { role: "contractor" },
  );

  console.log("customers", customers);

  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await DIContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse and validate request body
    const customerData = await request.json();

    // Create customer
    await DIContainer.customersUseCases.createCustomer({
      ...customerData,
      contractor_user_id: user.id,
    });

    return NextResponse.json(
      { message: "Customer successfully created", customer: customerData },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Failed to create customer", error);
    return NextResponse.json(
      { error: error.message || "Failed to create customer" },
      { status: 500 },
    );
  }
}
