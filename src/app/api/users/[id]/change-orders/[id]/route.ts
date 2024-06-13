import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../../../db";
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const data: ChangeOrder = await request.json();
    await db
      .update(changeOrders)
      .set({
        changeOrderName: data.changeOrderName,
        description: data.description,
        updatedAt: new Date(),
      })
      .where(eq(changeOrders.id, parseInt(params.id)));
    return NextResponse.json("Profile sucsussfully updated");
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await db
      .delete(changeOrders)
      .where(eq(changeOrders.id, parseInt(params.id)));
    return NextResponse.json("Profile sucsussfully updated");
  } catch (error) {
    return NextResponse.json(error);
  }
}
