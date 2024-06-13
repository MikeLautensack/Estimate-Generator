import { NextRequest, NextResponse } from "next/server";
import {
  estimates,
  lineItems,
} from "../../../../../../../../../db/schemas/estimates";
import { db } from "../../../../../../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../../../../../utils/authOptions";
import { Estimates, LineItems } from "@/types/estimates";
import { Session } from "next-auth";
import { changeOrders } from "@/db/schemas/changeOrders";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Estimates;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    const estimate = await db
      .select()
      .from(estimates)
      .where(eq(estimates.id, parseInt(params.estimate_id)));
    return NextResponse.json(
      { message: "Estimate successfully retrived", estimate: estimate },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Estimates;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    await db.insert(estimates).values({
      id: parseInt(params.estimate_id),
      contractor_user_id: parseInt(params.user_id),
      customer_id: parseInt(params.customer_id),
      customer_user_id: bodyData.customer_user_id,
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
    });
    await db.insert(lineItems).values(
      bodyData.lineItems.map((item: LineItems) => {
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
      }),
    );
    return NextResponse.json(
      { message: "Estimate successfully created" },
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
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get request body data
  const bodyData = (await request.json()) as Estimates;

  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    await db
      .update(estimates)
      .set({
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
      })
      .where(eq(estimates.id, parseInt(params.estimate_id)));

    await db
      .delete(lineItems)
      .where(eq(lineItems.estimate_id, parseInt(params.estimate_id)));

    await db.insert(lineItems).values(
      bodyData.lineItems.map((item: LineItems) => {
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
      }),
    );
    return NextResponse.json(
      { message: "Estimate successfully updated" },
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
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get session
  const session = (await getServerSession(authOptions)) as Session;

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  try {
    await db
      .delete(estimates)
      .where(eq(estimates.id, parseInt(params.estimate_id)));

    await db
      .delete(lineItems)
      .where(eq(lineItems.estimate_id, parseInt(params.estimate_id)));

    await db
      .delete(changeOrders)
      .where(eq(changeOrders.estimate_id, parseInt(params.estimate_id)));

    return NextResponse.json(
      { message: "Estimate successfully deleted" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
