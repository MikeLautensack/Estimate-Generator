import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { changeOrders } from "@/db/schemas/changeOrders";
import { ChangeOrder } from "@/types/changeOrders";

export async function PUT(
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
        dateUpdated: new Date(),
      })
      .where(eq(changeOrders.id, parseInt(params.id)));
    return NextResponse.json("Profile sucsussfully updated");
  } catch (error) {
    return NextResponse.json(error);
  }
}
