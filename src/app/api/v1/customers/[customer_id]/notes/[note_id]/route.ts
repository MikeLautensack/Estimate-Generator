import IoCContainer from "@/core/IoCContainer";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { selectCustomersNotesSchema } from "@/db/schemas/customersNotes";
import { PartialNote } from "@/core/entities/DTOs/PartialNote";

const getRequestSchema = z.object({
  note_id: z.string().uuid(),
  customer_id: z.string().uuid(),
});
const getResponseSchema = z.object({
  data: selectCustomersNotesSchema,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { customer_id: string; note_id: string } },
) {
  // Get authenticated user
  const user = await IoCContainer.authUseCases.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const validRequest = getRequestSchema.safeParse(params);

  if (!validRequest.success) {
    return NextResponse.json(
      { error: validRequest.error.format() },
      { status: 422 },
    );
  }

  const note = await IoCContainer.customersNotesUseCases.getNoteById(
    params.note_id,
  );

  const response = {
    data: note,
  };

  const validResponse = getResponseSchema.safeParse(response);

  if (!validResponse.success) {
    return NextResponse.json(
      { error: validResponse.error.format() },
      { status: 400 },
    );
  }

  return NextResponse.json(validResponse.data, { status: 200 });
}

const patchRequestSchema = z.object({
  params: z.object({
    note_id: z.string().uuid(),
    customer_id: z.string().uuid(),
  }),
  body: z.object({ note: z.string().optional() }),
});
export interface ICustomersNotePATCHRequest
  extends z.infer<typeof patchRequestSchema> {}
const patchResponseSchema = z.object({
  data: selectCustomersNotesSchema,
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { customer_id: string; note_id: string } },
) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse request body
    const body = await request.json();

    const validRequest = patchRequestSchema.safeParse({ params, body });

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 422 },
      );
    }

    const note = new PartialNote(validRequest.data);

    // Update customer
    const queryResults =
      await IoCContainer.customersNotesUseCases.updateNote(note);

    const response = {
      data: queryResults,
    };

    const validResponse = patchResponseSchema.safeParse(response);

    if (!validResponse.success) {
      return NextResponse.json(
        { error: validResponse.error.format() },
        { status: 400 },
      );
    }

    return NextResponse.json(validResponse.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update customer" },
      { status: 500 },
    );
  }
}

const deleteRequestSchema = z.object({
  note_id: z.string().uuid(),
  customer_id: z.string().uuid(),
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: { customer_id: string; note_id: string } },
) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const validRequest = deleteRequestSchema.safeParse(params);

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 422 },
      );
    }

    // Delete customer
    await IoCContainer.customersNotesUseCases.deleteNote(
      validRequest.data.note_id,
    );

    return NextResponse.json({ status: 204 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete customer" },
      { status: 500 },
    );
  }
}
