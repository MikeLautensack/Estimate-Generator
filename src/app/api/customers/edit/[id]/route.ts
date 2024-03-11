import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { customers } from "../../../../../db/schemas/customers";
import { eq } from "drizzle-orm";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {

    const data = await request.json();

    try {
        const customer = await db.update(customers)
                                  .set({
                                      name: data.name,
                                      address: data.address,
                                      email: data.email,
                                      phone: data.phone,
                                      dateUpdated: new Date(),
                                  })
                                  .where(eq(customers.id, parseInt(params.id)));
        return NextResponse.json(customer);
    } catch (error) {
        return NextResponse.json(error);
    }
}