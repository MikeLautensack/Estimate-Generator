import DIContainer from "@/core/DIContainer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const { data: user, error: userError } =
      await DIContainer.authUseCases.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const customerData = await request.json();

    // Create customer
    await DIContainer.customersUseCases.createCustomer({
      ...customerData,
      contractor_user_id: user.user.id,
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
