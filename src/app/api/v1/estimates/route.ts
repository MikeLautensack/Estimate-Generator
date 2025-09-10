import IoCContainer from "@/core/IoCContainer";
import { NextRequest, NextResponse } from "next/server";
import {
  EstimatesWithLineItemsInsert,
  selectEstimateSchema,
} from "@/db/schemas/estimates";
import z from "zod";
import { createDraftFactory } from "@/utils/factories/createDraftFactory";

const requestSchema = z.object({ customerId: z.string().uuid().optional() });
const responseSchema = selectEstimateSchema;

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    const validRequest = requestSchema.safeParse(body);

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 400 },
      );
    }

    const profile = await IoCContainer.profilesUseCases.getProfileByUserId(
      user.id,
    );

    const draft: EstimatesWithLineItemsInsert = await createDraftFactory(
      profile,
      validRequest,
      user,
    );

    const estimate = await IoCContainer.estimatesUseCases.createDraft(draft);

    const validResponse = responseSchema.safeParse(estimate);

    if (!validResponse.success) {
      return NextResponse.json(
        { error: validResponse.error.format() },
        { status: 400 },
      );
    }

    return NextResponse.json({ ...validResponse.data }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to create estimate", error);
    return NextResponse.json(
      { error: error.message || "Failed to create estimate" },
      { status: 500 },
    );
  }
}
