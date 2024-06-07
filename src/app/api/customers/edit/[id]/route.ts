import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { customers } from "../../../../../db/schemas/customers";
import { eq } from "drizzle-orm";
import { Customers } from "@/types/customers";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = (await request.json()) as Customers;

  try {
    const customer = await db
      .update(customers)
      .set({
        address: data.address,
        email: data.email,
        name: data.name,
        phone: data.phone,
        updatedAt: new Date(),
      })
      .where(eq(customers.id, parseInt(params.id)));
    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(error);
  }
}
