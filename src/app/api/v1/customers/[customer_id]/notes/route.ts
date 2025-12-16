import { Note } from "@/core/entities/DTOs/Note";
import { QueryParams } from "@/core/entities/DTOs/QueryParams";
import IoCContainer from "@/core/IoCContainer";
import { selectCustomersNotesSchema } from "@/db/schemas/customersNotes";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const getRequestSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  page: z.string(),
  size: z.string(),
});
const getResponseSchema = z.object({
  data: z.array(selectCustomersNotesSchema),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    size: z.number(),
    has_more: z.boolean(),
  }),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Get authenticated user
  const user = await IoCContainer.authUseCases.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const page: string | null = searchParams.get("page");
  const size: string | null = searchParams.get("size");

  const validRequest = getRequestSchema.safeParse({ params, page, size });

  if (!validRequest.success) {
    return NextResponse.json(
      { error: validRequest.error.format() },
      { status: 422 },
    );
  }

  const queryParams = new QueryParams(
    validRequest.data.page,
    validRequest.data.size,
  );

  const queryResults =
    await IoCContainer.customersNotesUseCases.getNotesByCustomerId(
      params.id,
      queryParams.page,
      queryParams.size,
    );

  const response = {
    data: queryResults.notes,
    meta: {
      total: queryResults.total,
      page: queryParams.page,
      size: queryParams.size,
      has_more: queryParams.page * queryParams.size < queryResults.total,
    },
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

const postBodySchema = z.object({
  note: z.string(),
});
const postRequestSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: postBodySchema,
});
export interface ICustomersNotePOSTRequest
  extends z.infer<typeof postRequestSchema> {}
const postResponseSchema = z.object({
  data: selectCustomersNotesSchema,
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Parse and validate request body
    const body = await request.json();

    const validRequest = postRequestSchema.safeParse({ params, body });

    if (!validRequest.success) {
      return NextResponse.json(
        { error: validRequest.error.format() },
        { status: 422 },
      );
    }

    const note = new Note(validRequest.data);

    // Create customers note
    const queryResults =
      await IoCContainer.customersNotesUseCases.createNote(note);

    const response = {
      data: queryResults,
    };

    const validResponse = postResponseSchema.safeParse(response);

    if (!validResponse.success) {
      return NextResponse.json(
        { error: validResponse.error.format() },
        { status: 400 },
      );
    }

    return NextResponse.json(validResponse.data, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create customer", error);
    return NextResponse.json(
      { error: error.message || "Failed to create customer" },
      { status: 500 },
    );
  }
}
