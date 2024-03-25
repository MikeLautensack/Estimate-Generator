import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { estimates } from "../../../../../db/schemas/estimates";
import { lineItems } from "../../../../../db/schemas/estimates";
import { eq } from "drizzle-orm";
import { Estimates, LineItems } from "@/types/estimates";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const data = (await request.json()) as Estimates;

  try {
    await db
      .update(estimates)
      .set({
        estimateName: data.estimateName,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        projectAddress: data.projectAddress,
        contractorName: data.contractorName,
        contractorAddress: data.contractorAddress,
        contractorPhone: data.contractorPhone,
        message: data.message,
        subtotal: data.subtotal,
        taxRate: data.taxRate,
        tax: data.tax,
        total: data.total,
        status: data.status,
        dateUpdated: new Date(),
      })
      .where(eq(estimates.id, parseInt(params.id)));

    await db
      .delete(lineItems)
      .where(eq(lineItems.estimate_id, parseInt(params.id)));

    await db.insert(lineItems).values(
      data.lineItems.map((item: LineItems) => {
        return {
          id: Math.floor(Math.random() * 100000000),
          item: item.item,
          description: item.description,
          quantity: item.quantity,
          rateType: item.rateType,
          price: item.price,
          amount: item.amount,
          estimate_id: parseInt(params.id),
        };
      }),
    );
    return NextResponse.json("Estimate sucsussfully updated");
  } catch (error) {
    return NextResponse.json(error);
  }
}
