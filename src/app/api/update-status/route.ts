import { db } from "@/db";
import { estimates, lineItems } from "@/db/schemas/estimates";
import { Estimates, LineItems } from "@/types/estimates";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { estimate_id: string } },
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
    status: bodyData.status,
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

  // Respond with 200 after all DB operations
  // Respond 200 after all DB operations
  return NextResponse.json(
    {
      message: "Estimate successfully updated",
      updatedEstimateData: updatedEstimateData,
    },
    { status: 200 },
  );
}
