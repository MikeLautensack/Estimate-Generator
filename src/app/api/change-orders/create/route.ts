import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { changeOrders } from "@/db/schemas/changeOrders";
import { ChangeOrder } from "@/types/changeOrders";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as ChangeOrder;

  try {
    await db.insert(changeOrders).values({
      id: Math.floor(Math.random() * 100000000),
      contractor_user_id: data.contractor_user_id,
      customer_user_id: data.customer_user_id,
      estimate_id: data.estimate_id,
      changeOrderName: data.changeOrderName,
      customerName: data.customerName,
      description: data.description,
      estimateName: data.estimateName,
      projectAddress: data.projectAddress,
      status: "Pending Approval",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json("Customer sucsessfully created");
  } catch (error) {
    return NextResponse.json(error);
  }
}
