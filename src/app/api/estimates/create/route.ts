import { NextRequest, NextResponse } from "next/server";
import { estimates, lineItems } from "../../../../db/schemas/estimates";
import { db } from "../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../utils/authOptions";
import { lineItem } from "@/types/types";
import { Estimates, LineItems } from "@/types/estimates";
import { Session } from "next-auth";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as Estimates;
  const session = (await getServerSession(authOptions)) as Session;
  const estimateId = Math.floor(Math.random() * 100000000);

  try {
    await db.insert(estimates).values({
      id: estimateId,
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
      dateCreated: new Date(),
      dateUpdated: new Date(),
      customer_id: data.customer_id,
      contractor_user_id: session.user.id,
      customer_user_id: data.customer_user_id,
    });
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
          estimate_id: estimateId,
        };
      }),
    );
    return NextResponse.json("Estimate sucsessfully created");
  } catch (error) {
    return NextResponse.json(error);
  }
}
