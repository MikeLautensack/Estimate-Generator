import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../db";
import { estimates } from "../../../../../db/schemas/estimates";
import { eq } from "drizzle-orm";

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {

    const data = await request.json();

    try {
        await db.update(estimates)
                .set({
                    status: data.status
                })
                .where(eq(estimates.id, parseInt(params.id)));
        return NextResponse.json("Profile sucsussfully updated");
    } catch (error) {
        return NextResponse.json(error);
    }
}