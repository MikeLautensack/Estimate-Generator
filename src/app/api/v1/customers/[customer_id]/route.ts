import IoCContainer from "@/core/IoCContainer";
import { NextRequest, NextResponse } from "next/server";
import { CustomersInsert, selectCustomerSchema } from "@/db/schemas/customers";
import z from "zod";
import { PartialCustomer } from "@/core/entities/DTOs/PartialCustomer";

const getRequestSchema = z.object({
  id: z.string().uuid(),
});
const getResponseSchema = z.object({
  data: selectCustomerSchema,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Get authenticated user
  const user = await IoCContainer.authUseCases.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const validRequest = getRequestSchema.safeParse(params);

  if (!validRequest.success) {
    return NextResponse.json(
      { error: validRequest.error.format() },
      { status: 422 },
    );
  }

  const customer = await IoCContainer.customersUseCases.getCustomerById(
    params.id,
  );

  const response = {
    data: customer,
  };

  const validResponse = getResponseSchema.safeParse(response);

  if (!validResponse.success) {
    return NextResponse.json(
      { error: validResponse.error.format() },
      { status: 400 },
    );
  }

  return NextResponse.json(validResponse.data, { status: 200 });
}

const patchRequestSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  credit_balance: z.number().optional(),
});
export interface ICustomerPATCHRequest
  extends z.infer<typeof patchRequestSchema> {}
const patchResponseSchema = z.object({
  data: selectCustomerSchema,
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse request body
    const body = await request.json();

    const validRequest = patchRequestSchema.safeParse(body);

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 422 },
      );
    }

    const customer = new PartialCustomer(validRequest.data);

    // Update customer
    const queryResults = await IoCContainer.customersUseCases.updateCustomer(
      params.id,
      customer,
    );

    const response = {
      data: queryResults,
    };

    const validResponse = patchResponseSchema.safeParse(response);

    if (!validResponse.success) {
      return NextResponse.json(
        { error: validResponse.error.format() },
        { status: 400 },
      );
    }

    return NextResponse.json(validResponse.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update customer" },
      { status: 500 },
    );
  }
}

const deleteRequestSchema = z.object({
  id: z.string().uuid(),
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const validRequest = deleteRequestSchema.safeParse(params);

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 422 },
      );
    }

    // Delete customer
    await IoCContainer.customersUseCases.deleteCustomer(params.id);

    return NextResponse.json({ status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete customer" },
      { status: 500 },
    );
  }
}
