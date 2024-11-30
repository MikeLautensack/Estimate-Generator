import { NextRequest, NextResponse } from "next/server";
import {
  estimates,
  lineItems,
} from "../../../../../../../../db/schemas/estimates";
import { db } from "../../../../../../../../db";
import { LineItems } from "@/types/estimates";
import { changeOrders } from "@/db/schemas/changeOrders";
import { eq } from "drizzle-orm";
import { auth } from "../../../../../../../../../auth";
import { UTApi } from "uploadthing/server";
import { pdfs } from "@/db/schemas/pdf";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get request body data
  const bodyData = await request.json();

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Create estimate data object
  const estimateData = {
    id: parseInt(params.estimate_id),
    contractor_user_id: params.user_id,
    customer_id: parseInt(params.customer_id),
    customer_user_id: bodyData.customer_user_id,
    contractorAddress: bodyData.contractorAddress,
    contractorAddress2: bodyData.contractorAddress2,
    contractorCity: bodyData.contractorCity,
    contractorState: bodyData.contractorState,
    contractorZip: bodyData.contractorZip,
    contractorName: bodyData.contractorName,
    contractorPhone: bodyData.contractorPhone,
    customerEmail: bodyData.customerEmail,
    customerFirstName: bodyData.customerFirstName,
    customerLastName: bodyData.customerLastName,
    estimateName: bodyData.estimateName,
    message: bodyData.message,
    projectAddress: bodyData.projectAddress,
    projectAddress2: bodyData.projectAddress2,
    projectCity: bodyData.projectCity,
    projectState: bodyData.projectState,
    projectZip: bodyData.projectZip,
    status: bodyData.status,
    subtotal: bodyData.subtotal,
    tax: bodyData.tax,
    taxMode: bodyData.taxMode,
    taxRate: bodyData.taxRate,
    discountMode: bodyData.discountMode,
    discount: bodyData.discount,
    total: bodyData.total,
    expirationDate: new Date(bodyData.expirationDate),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Insert estimate data
  try {
    await db.insert(estimates).values(estimateData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Create line items data array
  const lineItemsArr = bodyData.lineItems?.map((item: LineItems) => {
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
    await db.insert(lineItems).values(lineItemsArr!);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const pdfObj = {
    estimateName: bodyData.estimateName,
    contractorName: bodyData.contractorName,
    contractorAddress: bodyData.contractorAddress,
    contractorPhone: bodyData.contractorPhone,
    projectAddress: bodyData.projectAddress,
    customerFirstName: bodyData.customerFirstName,
    customerLastName: bodyData.customerLastName,
    lineItems: bodyData.lineItems.map((item: any) => {
      return {
        amount: parseFloat(item.amount),
        description: item.description,
        item: item.item,
        price: parseFloat(item.price),
        quantity: parseFloat(item.quantity),
        rateType: item.rateType,
      };
    }),
    subtotal: parseFloat(bodyData.subtotal),
    tax: parseFloat(bodyData.tax),
    total: parseFloat(bodyData.total),
  };

  // Call the HTML-to-PDF microservice
  let pdfData;
  try {
    const pdfGenApi =
      process.env.PDF_GEN_API ||
      "https://html-to-pdf-brf6achxccgteehq.eastus-01.azurewebsites.net/generate-estimate-pdf";
    const pdfResponse = await fetch(pdfGenApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdfObj),
    });
    // Get the PDF data as an ArrayBuffer
    pdfData = await pdfResponse.arrayBuffer();
  } catch (error: any) {
    console.log("pdf gen not succsessful");
    return NextResponse.json(
      { error: "pdf gen not succsessful" },
      { status: 504 },
    );
  }

  // Create a File object from the buffer
  const file = new File([pdfData], `${bodyData.estimateName}.pdf`, {
    type: "application/pdf",
  });

  // Upload the PDF using UTApi
  const utapi = new UTApi() as any;
  const uploadResponse = await utapi.uploadFiles(file);

  if (!uploadResponse) {
    throw new Error(`Upload PDF Error`);
  }

  console.log("loging upload res", uploadResponse);

  // Insert pdf data
  try {
    await db.insert(pdfs).values({
      contractor_id: params.user_id,
      customer_id: params.customer_id,
      estimate_id: parseInt(params.estimate_id),
      fileKey: uploadResponse.data?.key,
      fileUrl: uploadResponse.data?.url,
      fileSize: uploadResponse.data?.size?.toString(),
      fileName: uploadResponse.data?.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }

  // Create a new response with the PDF data
  return new NextResponse(pdfData, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${bodyData.estimateName}"`,
    },
  });
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  // Get request body data
  const bodyData = await request.json();

  // Get session
  const session = await auth();

  // Check session is present
  if (!session) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  // Create estimate data object
  const updatedEstimateData = {
    contractorAddress: bodyData.contractorAddress,
    contractorAddress2: bodyData.contractorAddress2,
    contractorCity: bodyData.contractorCity,
    contractorState: bodyData.contractorState,
    contractorZip: bodyData.contractorZip,
    contractorName: bodyData.contractorName,
    contractorPhone: bodyData.contractorPhone,
    customerEmail: bodyData.customerEmail,
    customerFirstName: bodyData.customerFirstName,
    customerLastName: bodyData.customerLastName,
    estimateName: bodyData.estimateName,
    message: bodyData.message,
    projectAddress: bodyData.projectAddress,
    projectAddress2: bodyData.projectAddress2,
    projectCity: bodyData.projectCity,
    projectState: bodyData.projectState,
    projectZip: bodyData.projectZip,
    status: bodyData.status,
    subtotal: bodyData.subtotal,
    tax: bodyData.tax,
    taxMode: bodyData.taxMode,
    discountMode: bodyData.discountMode,
    discount: bodyData.discount,
    taxRate: bodyData.taxRate,
    total: bodyData.total,
    expirationDate: new Date(bodyData.expirationDate),
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
  const lineItemsArr = bodyData.lineItems?.map((item: LineItems) => {
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
    await db.insert(lineItems).values(lineItemsArr!);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Call the HTML-to-PDF microservice
  const pdfResponse = await fetch(process.env.PDF_GEN_API!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      estimateName: bodyData.estimateName,
      contractorName: bodyData.contractorName,
      contractorAddress: bodyData.contractorAddress,
      contractorPhone: bodyData.contractorPhone,
      projectAddress: bodyData.projectAddress,
      customerFirstName: bodyData.customerFirstName,
      customerLastName: bodyData.customerLastName,
      lineItems: lineItemsArr.map((item: LineItems) => {
        return {
          amount: item.amount,
          description: item.description,
          item: item.item,
          price: item.price,
          quantity: item.quantity,
          rateType: item.rateType,
        };
      }),
      subtotal: parseFloat(bodyData.subtotal),
      tax: parseFloat(bodyData.tax),
      total: parseFloat(bodyData.total),
    }),
  });

  console.log(pdfResponse);

  if (!pdfResponse.ok) {
    return NextResponse.json(
      { error: "pdf gen not succsessful" },
      { status: 500 },
    );
  }

  // Get the PDF data as an ArrayBuffer
  const pdfData = await pdfResponse.arrayBuffer();

  // Create a File object from the buffer
  const file = new File([pdfData], `${bodyData.estimateName}.pdf`, {
    type: "application/pdf",
  });

  // Upload the PDF using UTApi
  const utapi = new UTApi() as any;
  const uploadResponse = await utapi.uploadFiles(file);

  if (!uploadResponse) {
    throw new Error(`Upload PDF Error`);
  }

  // Insert pdf data
  try {
    await db
      .update(pdfs)
      .set({
        fileKey: uploadResponse.data?.key,
        fileUrl: uploadResponse.data?.url,
        fileSize: uploadResponse.data?.size?.toString(),
        fileName: uploadResponse.data?.name,
        updatedAt: new Date(),
      })
      .where(eq(pdfs.estimate_id, parseInt(params.estimate_id)));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 505 });
  }

  // Create a new response with the PDF data
  return new NextResponse(pdfData, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${bodyData.estimateName}"`,
    },
  });
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
