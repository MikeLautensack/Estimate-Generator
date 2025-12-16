import { NextRequest } from "next/server";
// import puppeteer from "puppeteer-core";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium"; // tiny headless build for Lambda
import type { PDFOptions } from "puppeteer-core";

export const runtime = "nodejs"; // Puppeteer needs Node runtime
export const maxDuration = 300; // 5‑minute ceiling (Vercel Pro/Team)
export const dynamic = "force-dynamic";

const isProd = process.env.VERCEL === "1"; // ③ prod = Vercel

export async function GET(req: NextRequest) {
  /** 1️⃣ — fetch whatever data you need (DB, params, etc.) */
  const searchParams = req.nextUrl.searchParams;
  const name = searchParams.get("name") ?? "Dragonborn";

  /** 2️⃣ — spin up headless Chrome */
  const browser = await puppeteer.launch({
    args: isProd ? chromium.args : [], // serverless tweaks only in prod
    executablePath: isProd ? await chromium.executablePath() : undefined,
    headless: "shell",
    defaultViewport: { width: 1200, height: 800 },
  });

  /** 3️⃣ — render HTML (can be any string, React SSR, Handlebars, etc.) */
  const html = /*html*/ `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @page { margin: 24mm 16mm; }
          body  { font-family: system-ui, sans-serif; color: #111; }
          h1    { color: #006CEB; margin: 0 0 8mm; }
          p     { line-height: 1.4; }
          .box  { border: 2px solid #006CEB;
                  padding: 8mm; border-radius: 6mm; }
        </style>
      </head>
      <body>
        <h1>Estimate for ${name}</h1>
        <div class="box">
          <p>You can design this with full CSS, web fonts, flexbox – anything
          the latest Chromium supports.</p>
          <p><strong>Total:</strong> $12 345.00</p>
        </div>
      </body>
    </html>
  `;

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  /** 4️⃣ — produce the PDF in memory */
  const pdfConfig: PDFOptions = {
    format: "A4",
    printBackground: true,
    margin: { top: "12mm", right: "12mm", bottom: "16mm", left: "12mm" },
  };
  const pdfBuffer = await page.pdf(pdfConfig);
  await browser.close();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="estimate.pdf"`,
    },
  });
}
