import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../../../../../../../db";
import { changeOrders } from "@/db/schemas/changeOrders";
import { ChangeOrder } from "@/types/changeOrders";
import { auth } from "../../../../../../../../../../../auth";

export async function POST(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string;
      customer_id: string;
      estimate_id: string;
      changeorder_id: string;
    };
  },
) {
  // Get request body data
  const bodyData = (await request.json()) as ChangeOrder;

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Insert change order data
  try {
    const changeOrder = {
      id: parseInt(params.changeorder_id),
      contractor_user_id: parseInt(params.user_id),
      customer_user_id: bodyData.customer_user_id,
      estimate_id: parseInt(params.estimate_id),
      customer_id: parseInt(params.customer_id),
      changeOrderName: bodyData.changeOrderName,
      customerName: bodyData.customerName,
      description: bodyData.description,
      estimateName: bodyData.estimateName,
      projectAddress: bodyData.projectAddress,
      status: bodyData.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.insert(changeOrders).values(changeOrder);

    return NextResponse.json(
      {
        message: "Change order successfully created",
        changeOrder: changeOrder,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string;
      customer_id: string;
      estimate_id: string;
      changeorder_id: string;
    };
  },
) {
  // Get request body data
  const bodyData = (await request.json()) as ChangeOrder;

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Update change order data
  try {
    const changeOrder = {
      changeOrderName: bodyData.changeOrderName,
      description: bodyData.description,
      updatedAt: new Date(),
      status: bodyData.status,
    };
    await db
      .update(changeOrders)
      .set(changeOrder)
      .where(eq(changeOrders.id, parseInt(params.changeorder_id)));
    return NextResponse.json(
      {
        message: "Change order successfully updated",
        changeOrder: changeOrder,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: {
      user_id: string;
      customer_id: string;
      estimate_id: string;
      changeorder_id: string;
    };
  },
) {
  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Delete change order data
  try {
    const changeOrder = await db
      .delete(changeOrders)
      .where(eq(changeOrders.id, parseInt(params.changeorder_id)));
    return NextResponse.json(
      {
        message: `Change order ${params.changeorder_id} successfully deleted`,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
