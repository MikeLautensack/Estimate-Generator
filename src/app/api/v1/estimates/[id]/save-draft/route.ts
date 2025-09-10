import { NextRequest, NextResponse } from "next/server";
import {
  EstimatesWithLineItemsInsert,
  insertEstimatesWithLineItemsSchema,
} from "@/db/schemas/estimates";
import IoCContainer from "@/core/IoCContainer";
import { updateDraftFactory } from "@/utils/factories/updateDraftFactory";

const requestSchema = insertEstimatesWithLineItemsSchema
  .omit({
    id: true,
    userId: true,
    customerId: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  })
  .partial();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get request body data
    const body = await request.json();

    const validRequest = requestSchema.safeParse(body);

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 400 },
      );
    }

    // Create estimate data object
    const updatedDraft: Partial<EstimatesWithLineItemsInsert> =
      updateDraftFactory(user.id, validRequest.data);

    await IoCContainer.estimatesUseCases.saveDraft(params.id, updatedDraft);

    return NextResponse.json(
      { message: "Estimate draft successfully saved" },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  //   // Call the HTML-to-PDF microservice
  //   const pdfResponse = await fetch(process.env.PDF_GEN_API!, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       estimateName: body.estimateName,
  //       contractorName: body.contractorName,
  //       contractorAddress: body.contractorAddress,
  //       contractorPhone: body.contractorPhone,
  //       projectAddress: body.projectAddress,
  //       customerFirstName: body.customerFirstName,
  //       customerLastName: body.customerLastName,
  //       lineItems: lineItemsArr.map((item: LineItems) => {
  //         return {
  //           amount: item.amount,
  //           description: item.description,
  //           item: item.item,
  //           price: item.price,
  //           quantity: item.quantity,
  //           rateType: item.rateType,
  //         };
  //       }),
  //       subtotal: parseFloat(body.subtotal),
  //       tax: parseFloat(body.tax),
  //       total: parseFloat(body.total),
  //     }),
  //   });

  //   if (!pdfResponse.ok) {
  //     return NextResponse.json(
  //       { error: "pdf gen not succsessful" },
  //       { status: 500 },
  //     );
  //   }

  //   // Get the PDF data as an ArrayBuffer
  //   const pdfData = await pdfResponse.arrayBuffer();

  //   // Create a File object from the buffer
  //   const file = new File([pdfData], `${body.estimateName}.pdf`, {
  //     type: "application/pdf",
  //   });

  //   // Upload the PDF using UTApi
  //   const utapi = new UTApi() as any;
  //   const uploadResponse = await utapi.uploadFiles(file);

  //   if (!uploadResponse) {
  //     throw new Error(`Upload PDF Error`);
  //   }

  //   // Insert pdf data
  //   try {
  //     await db
  //       .update(pdfs)
  //       .set({
  //         fileKey: uploadResponse.data?.key,
  //         fileUrl: uploadResponse.data?.url,
  //         fileSize: uploadResponse.data?.size?.toString(),
  //         fileName: uploadResponse.data?.name,
  //         updatedAt: new Date(),
  //       })
  //       .where(eq(pdfs.estimate_id, parseInt(params.estimate_id)));
  //   } catch (error: any) {
  //     return NextResponse.json({ error: error.message }, { status: 505 });
  //   }

  //   // Create a new response with the PDF data
  //   return new NextResponse(pdfData, {
  //     status: 200,
  //     headers: {
  //       "Content-Type": "application/pdf",
  //       "Content-Disposition": `attachment; filename="${body.estimateName}"`,
  //     },
  //   });
}
