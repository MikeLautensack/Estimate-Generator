import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

// Read the template file
const templatePath = path.join(process.cwd(), "src", "pdf", "estimate.hbs");
const templateSource = fs.readFileSync(templatePath, "utf8");

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Check if the user is authenticated
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the JSON body
    const body = await request.json();
    const { data } = body;

    // Compile the template
    const template = Handlebars.compile(templateSource);

    // Generate HTML using the template and data
    const html = template({
      estimateName: data.estimateName,
      status: data.status,
    });

    // Call the HTML-to-PDF microservice
    const pdfResponse = await fetch(process.env.PDF_GEN_API!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        HtmlContent: html,
        fileName: data.estimateName,
      }),
    });

    if (!pdfResponse.ok) {
      throw new Error(`HTTP error! status: ${pdfResponse.status}`);
    } else {
      console.log("pdf gen is successful", pdfResponse.status);
    }

    // Get the PDF data as an ArrayBuffer
    const pdfData = await pdfResponse.arrayBuffer();

    // Create a new response with the PDF data
    return new NextResponse(pdfData, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${data.estimateName}"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
