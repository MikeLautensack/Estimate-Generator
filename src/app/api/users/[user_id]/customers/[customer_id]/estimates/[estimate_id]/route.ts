import { NextRequest, NextResponse } from "next/server";
import {
  estimates,
  lineItems,
} from "../../../../../../../../db/schemas/estimates";
import { db } from "../../../../../../../../db";
import { Estimates, LineItems } from "@/types/estimates";
import { changeOrders } from "@/db/schemas/changeOrders";
import { eq } from "drizzle-orm";
import { auth } from "../../../../../../../../../auth";

export async function POST(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Estimates;

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Create estimate data object
  const estimateData = {
    id: parseInt(params.estimate_id),
    contractor_user_id: parseInt(params.user_id),
    customer_id: parseInt(params.customer_id),
    customer_user_id: bodyData.customer_user_id.toString(),
    contractorAddress: bodyData.contractorAddress,
    contractorName: bodyData.contractorName,
    contractorPhone: bodyData.contractorPhone,
    customerEmail: bodyData.customerEmail,
    customerName: bodyData.customerName,
    estimateName: bodyData.estimateName,
    message: bodyData.message,
    projectAddress: bodyData.projectAddress,
    status: bodyData.status,
    subtotal: bodyData.subtotal,
    tax: bodyData.tax,
    taxRate: bodyData.taxRate,
    total: bodyData.total,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Insert estimate data
  try {
    await db.insert(estimates).values(estimateData);
    console.log("estimate ____");
  } catch (error: any) {
    console.log("estimate", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create line items data array
  const lineItemsArr = bodyData.lineItems.map((item: LineItems) => {
    return {
      id: Math.floor(Math.random() * 100000000),
      estimate_id: parseInt(params.estimate_id),
      amount: item.amount,
      description: item.description,
      item: item.item,
      price: item.price,
      quantity: item.quantity,
      rateType: item.rateType,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  // Insert lineitems data
  try {
    await db.insert(lineItems).values(lineItemsArr);
    console.log("lineItems ____");
  } catch (error: any) {
    console.log("lineitems", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Respond 200 after all DB operations
  return NextResponse.json(
    {
      message: "Estimate successfully created",
      estimateData: estimateData,
      lineItems: lineItemsArr,
    },
    { status: 200 },
  );
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Estimates;

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Create estimate data object
  const updatedEstimateData = {
    contractorAddress: bodyData.contractorAddress,
    contractorName: bodyData.contractorName,
    contractorPhone: bodyData.contractorPhone,
    customerEmail: bodyData.customerEmail,
    customerName: bodyData.customerName,
    estimateName: bodyData.estimateName,
    message: bodyData.message,
    projectAddress: bodyData.projectAddress,
    status: bodyData.status,
    subtotal: bodyData.subtotal,
    tax: bodyData.tax,
    taxRate: bodyData.taxRate,
    total: bodyData.total,
    updatedAt: new Date(),
  };

  // Update estimate data
  try {
    await db
      .update(estimates)
      .set(updatedEstimateData)
      .where(eq(estimates.id, parseInt(params.estimate_id)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete old lineitems
  try {
    await db
      .delete(lineItems)
      .where(eq(lineItems.estimate_id, parseInt(params.estimate_id)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create line items data array
  const lineItemsArr = bodyData.lineItems.map((item: LineItems) => {
    return {
      id: Math.floor(Math.random() * 100000000),
      estimate_id: parseInt(params.estimate_id),
      amount: item.amount,
      description: item.description,
      item: item.item,
      price: item.price,
      quantity: item.quantity,
      rateType: item.rateType,
      updatedAt: new Date(),
    };
  });

  // Insert new lineitems
  try {
    await db.insert(lineItems).values(lineItemsArr);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Respond with 200 after all DB operations
  // Respond 200 after all DB operations
  return NextResponse.json(
    {
      message: "Estimate successfully updated",
      updatedEstimateData: updatedEstimateData,
      lineItems: lineItemsArr,
    },
    { status: 200 },
  );
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Delete estimate tabel row
  try {
    await db
      .delete(estimates)
      .where(eq(estimates.id, parseInt(params.estimate_id)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete associated line items
  try {
    await db
      .delete(lineItems)
      .where(eq(lineItems.estimate_id, parseInt(params.estimate_id)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Delete associated change orders
  try {
    await db
      .delete(changeOrders)
      .where(eq(changeOrders.estimate_id, parseInt(params.estimate_id)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Respond 200 after all DB operations
  return NextResponse.json(
    { message: "Estimate successfully deleted" },
    { status: 200 },
  );
}
