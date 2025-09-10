import { Customer } from "@/core/entities/DTOs/Customer";
import { QueryParams } from "@/core/entities/DTOs/QueryParams";
import IoCContainer from "@/core/IoCContainer";
import { selectCustomerSchema } from "@/db/schemas/customers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const getRequestSchema = z.object({
  page: z.string(),
  size: z.string(),
});
const getResponseSchema = z.object({
  data: z.array(selectCustomerSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    size: z.number(),
    has_more: z.boolean(),
  }),
});

export async function GET(request: NextRequest) {
  // Get authenticated user
  const user = await IoCContainer.authUseCases.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const page: string | null = searchParams.get("page");
  const size: string | null = searchParams.get("size");

  const validRequest = getRequestSchema.safeParse({ page, size });

  if (!validRequest.success) {
    return NextResponse.json(
      { error: validRequest.error.format() },
      { status: 422 },
    );
  }

  const queryParams = new QueryParams(
    validRequest.data.page,
    validRequest.data.size,
  );

  const queryResults = await IoCContainer.customersUseCases.getCustomers(
    user.id,
    queryParams.page,
    queryParams.size,
    { role: "contractor" },
  );

  const response = {
    data: queryResults.customers,
    meta: {
      total: queryResults.total,
      page: queryParams.page,
      size: queryParams.size,
      has_more: queryParams.page * queryParams.size < queryResults.total,
    },
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

const postRequestSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});
export interface ICustomerPOSTRequest
  extends z.infer<typeof postRequestSchema> {}
const postResponseSchema = z.object({
  data: selectCustomerSchema,
});

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    const validRequest = postRequestSchema.safeParse(body);

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 422 },
      );
    }

    const customer = new Customer(validRequest.data, user.id);

    // Create customer
    const quaryResult = await IoCContainer.customersUseCases.createCustomer({
      ...customer,
      contractor_user_id: user.id,
    });

    const response = { data: quaryResult };

    const validResponse = postResponseSchema.safeParse(response);

    if (!validResponse.success) {
      return NextResponse.json(
        { error: validResponse.error.format() },
        { status: 400 },
      );
    }

    return NextResponse.json(validResponse.data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create customer", error);
    return NextResponse.json(
      { error: error.message || "Failed to create customer" },
      { status: 500 },
    );
  }
}
