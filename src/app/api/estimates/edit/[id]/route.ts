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
        contractorAddress: data.contractorAddress,
        contractorName: data.contractorName,
        contractorPhone: data.contractorPhone,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        estimateName: data.estimateName,
        message: data.message,
        projectAddress: data.projectAddress,
        status: data.status,
        subtotal: data.subtotal,
        tax: data.tax,
        taxRate: data.taxRate,
        total: data.total,
        updatedAt: new Date(),
      })
      .where(eq(estimates.id, parseInt(params.id)));

    await db
      .delete(lineItems)
      .where(eq(lineItems.estimate_id, parseInt(params.id)));

    await db.insert(lineItems).values(
      data.lineItems.map((item: LineItems) => {
        return {
          id: Math.floor(Math.random() * 100000000),
          estimate_id: parseInt(params.id),
          amount: item.amount,
          description: item.description,
          item: item.item,
          price: item.price,
          quantity: item.quantity,
          rateType: item.rateType,
          updatedAt: new Date(),
        };
      }),
    );
    return NextResponse.json("Estimate sucsussfully updated");
  } catch (error) {
    return NextResponse.json(error);
  }
}
