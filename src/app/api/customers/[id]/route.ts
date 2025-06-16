import DIContainer from "@/core/DIContainer";
import { NextRequest, NextResponse } from "next/server";
import { CustomersInsert } from "@/db/schemas/customers";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const { data: user, error: userError } =
      await DIContainer.authUseCases.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const customerData = (await request.json()) as CustomersInsert;

    // Update customer
    await DIContainer.customersUseCases.updateCustomer(params.id, customerData);

    return NextResponse.json(
      { message: "Customer successfully updated", customer: customerData },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update customer" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const { data: user, error: userError } =
      await DIContainer.authUseCases.getUser();
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete customer
    await DIContainer.customersUseCases.deleteCustomer(params.id);

    return NextResponse.json(
      { message: `Customer ${params.id} successfully deleted` },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete customer" },
      { status: 500 },
    );
  }
}
