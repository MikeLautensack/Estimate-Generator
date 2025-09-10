import { NextRequest, NextResponse } from "next/server";
import IoCContainer from "@/core/IoCContainer";

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

    // Create estimate data object
    // const finalizedDraft: EstimatesWithLineItemsInsert = {
    //   contractorAddress: body.contractorAddress,
    //   contractorAddress2: body.contractorAddress2,
    //   contractorCity: body.contractorCity,
    //   contractorState: body.contractorState,
    //   contractorZip: body.contractorZip,
    //   contractorName: body.contractorName,
    //   contractorPhone: body.contractorPhone,
    //   customerEmail: body.customerEmail,
    //   customerFirstName: body.customerFirstName,
    //   customerLastName: body.customerLastName,
    //   estimateName: body.estimateName,
    //   message: body.message,
    //   projectAddress: body.projectAddress,
    //   projectAddress2: body.projectAddress2,
    //   projectCity: body.projectCity,
    //   projectState: body.projectState,
    //   projectZip: body.projectZip,
    //   status: body.status,
    //   subtotal: body.subtotal,
    //   tax: body.tax,
    //   taxMode: body.taxMode,
    //   discountMode: body.discountMode,
    //   discount: body.discount,
    //   taxRate: body.taxRate,
    //   total: body.total,
    //   expirationDate: new Date(body.expirationDate),
    //   updatedAt: new Date(),
    // };

    // const res =
    //   await IoCContainer.estimatesUseCases.finalizeDraftAndCreateEstimate(
    //     params.id,
    //     finalizedDraft,
    //   );

    return NextResponse.json(
      { message: "Estimate draft successfully finalized and estimate created" },
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
