import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

// Read the template file
const templatePath = path.join(process.cwd(), "src", "pdf", "test.hbs");
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
    const { title, heading, content } = body;

    // Compile the template
    const template = Handlebars.compile(templateSource);

    // Generate HTML using the template and data
    const html = template({ title, heading, content });

    // Call the HTML-to-PDF microservice
    const pdfResponse = await fetch("http://localhost:5000/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html }),
    });

    if (!pdfResponse.ok) {
      throw new Error(`HTTP error! status: ${pdfResponse.status}`);
    }

    console.log(pdfResponse);

    // Get the PDF data as an ArrayBuffer
    const pdfData = await pdfResponse.arrayBuffer();

    // Create a new response with the PDF data
    const response = new NextResponse(pdfData);

    // Set response headers
    response.headers.set("Content-Type", "application/pdf");
    response.headers.set(
      "Content-Disposition",
      "attachment; filename=generated.pdf",
    );

    return response;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
