"use server";

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
import Handlebars from "handlebars";
import { UTApi } from "uploadthing/server";
import { pdfs } from "@/db/schemas/pdf";
import path from "path";
import { promises as fs } from "fs";
import { logs } from "@/db/schemas/logs";

// Helper function to load template
async function loadTemplate() {
  try {
    // Use path.resolve instead of path.join and account for different environments
    const templatePath = path.resolve(
      process.cwd(),
      "src",
      "pdf",
      "estimate.hbs",
    );
    // Add logging to debug the path in production
    await db.insert(logs).values({
      logMessage: `Template path: ${templatePath}`,
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const template = await fs.readFile(templatePath, "utf-8");

    // Log success
    await db.insert(logs).values({
      logMessage: `Template loaded successfully, length: ${template.length}`,
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return template;
  } catch (error) {
    // Enhanced error logging
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    await db.insert(logs).values({
      logMessage: `Error loading template: ${errorMessage}\nStack: ${error instanceof Error ? error.stack : "No stack trace"}\nPath: ${path.resolve(process.cwd(), "src", "pdf", "estimate.hbs")}`,
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    throw new Error(`Failed to load template: ${errorMessage}`);
  }
}

export async function POST(
  request: NextRequest,
  {
    params,
  }: { params: { user_id: string; customer_id: string; estimate_id: string } },
) {
  await db.insert(logs).values({
    logMessage: "testing post endpoint",
    env: process.env.NODE_ENV,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
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
    customer_user_id: bodyData.customer_user_id.toString(),
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
    await db.insert(logs).values({
      logMessage: "testing estimate data insert opp",
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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

  await db.insert(logs).values({
    logMessage: "testing below the line items insert",
    env: process.env.NODE_ENV,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Generate PDF
  let html: string;

  try {
    // Get template content
    const templateFile = await loadTemplate();
    // Compile the template
    const template = Handlebars.compile(templateFile);
    // Generate HTML using the template and data
    html = template({
      estimateName: bodyData.estimateName,
      status: bodyData.status,
      contractorName: bodyData.contractorName,
      contractorAddrss: bodyData.contractorAddress,
      contractorAddress2: bodyData.contractorAddress2,
      contractorCity: bodyData.contractorCity,
      contractorState: bodyData.contractorState,
      contractorZip: bodyData.contractorZip,
      contractorPhone: bodyData.contractorPhone,
      customerFirstName: bodyData.contractorFirstName,
      contractorLastName: bodyData.contractorLastName,
      customerEmail: bodyData.customerEmail,
      projectAddress: bodyData.projectAddress,
      projectAddress2: bodyData.projectAddress2,
      projectCity: bodyData.projectCity,
      projectState: bodyData.projectState,
      projectZip: bodyData.projectZip,
      lineItems: bodyData.lineItems,
      subtotal: bodyData.subtotal,
      taxRate: bodyData.taxRate,
      tax: bodyData.tax,
      discount: bodyData.discount,
      total: bodyData.total,
      expirationDate: bodyData.expirationDate,
      message: bodyData.message,
    });
  } catch (error: any) {
    await db.insert(logs).values({
      logMessage: "template catch block",
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Call the HTML-to-PDF microservice
  const pdfResponse = await fetch(process.env.PDF_GEN_API!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      HtmlContent: html,
      fileName: bodyData.estimateName,
    }),
  });

  if (!pdfResponse.ok) {
    throw new Error(`HTTP error! status: ${pdfResponse.status}`);
  } else {
    console.log("pdf gen is successful", pdfResponse.status);
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
    await db.insert(pdfs).values({
      contractor_id: params.user_id,
      customer_id: params.customer_id,
      estimate_id: parseInt(params.estimate_id),
      fileKey: uploadResponse.data?.key,
      fileUrl: uploadResponse.data?.url,
      fileSize: uploadResponse.data?.size.toString(),
      fileName: uploadResponse.data?.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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
  await db.insert(logs).values({
    logMessage: "testing patch endpoint",
    env: process.env.NODE_ENV,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
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

  // Generate PDF
  let html: string = "";

  try {
    // Get template content
    const templateFile = await loadTemplate();
    // Compile the template
    const template = Handlebars.compile(templateFile);
    // Generate HTML using the template and data
    html = template({
      estimateName: bodyData.estimateName,
      status: bodyData.status,
      contractorName: bodyData.contractorName,
      contractorAddrss: bodyData.contractorAddress,
      contractorAddress2: bodyData.contractorAddress2,
      contractorCity: bodyData.contractorCity,
      contractorState: bodyData.contractorState,
      contractorZip: bodyData.contractorZip,
      contractorPhone: bodyData.contractorPhone,
      customerFirstName: bodyData.contractorFirstName,
      contractorLastName: bodyData.contractorLastName,
      customerEmail: bodyData.customerEmail,
      projectAddress: bodyData.projectAddress,
      projectAddress2: bodyData.projectAddress2,
      projectCity: bodyData.projectCity,
      projectState: bodyData.projectState,
      projectZip: bodyData.projectZip,
      lineItems: bodyData.lineItems,
      subtotal: bodyData.subtotal,
      taxRate: bodyData.taxRate,
      tax: bodyData.tax,
      discount: bodyData.discount,
      total: bodyData.total,
      expirationDate: bodyData.expirationDate,
      message: bodyData.message,
    });
    await db.insert(logs).values({
      logMessage: "testing try block of create template",
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error: any) {
    await db.insert(logs).values({
      logMessage: "testing template try catch",
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ error: error.message }, { status: 505 });
  } finally {
    await db.insert(logs).values({
      logMessage: "testing template finally block",
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await db.insert(logs).values({
      logMessage: `html test: ${html}`,
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  await db.insert(logs).values({
    logMessage: `after template html test : ${html}`,
    env: process.env.NODE_ENV,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Call the HTML-to-PDF microservice
  let pdfResponse;
  try {
    pdfResponse = await fetch(process.env.PDF_GEN_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        HtmlContent: html,
        fileName: bodyData.estimateName,
      }),
    });
  } catch (error: any) {
    await db.insert(logs).values({
      logMessage: `pdf gen req catch block: ${pdfResponse}`,
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return NextResponse.json({ error: error.message }, { status: 503 });
  }

  if (!pdfResponse.ok) {
    await db.insert(logs).values({
      logMessage: "pdf res not ok",
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    throw new Error(`HTTP error! status: ${pdfResponse.status}`);
  } else {
    await db.insert(logs).values({
      logMessage: `pdf gen is successful ${pdfResponse.status}`,
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("pdf gen is successful", pdfResponse.status);
  }

  await db.insert(logs).values({
    logMessage: `after pdf res check ${pdfResponse}`,
    env: process.env.NODE_ENV,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

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
    await db.insert(logs).values({
      logMessage: "upload res not ok",
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    throw new Error(`Upload PDF Error`);
  }

  await db.insert(logs).values({
    logMessage: `after upload res check ${uploadResponse}`,
    env: process.env.NODE_ENV,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Insert pdf data
  try {
    await db
      .update(pdfs)
      .set({
        fileKey: uploadResponse.data?.key,
        fileUrl: uploadResponse.data?.url,
        fileSize: uploadResponse.data?.size.toString(),
        fileName: uploadResponse.data?.name,
        updatedAt: new Date(),
      })
      .where(eq(pdfs.estimate_id, parseInt(params.estimate_id)));
  } catch (error: any) {
    await db.insert(logs).values({
      logMessage: `Error: ${error.message}`,
      env: process.env.NODE_ENV,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
