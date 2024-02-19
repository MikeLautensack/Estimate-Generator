import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { changeOrders } from "@/db/schemas/changeOrders";
import { db } from "../../../../../db";

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await db.delete(changeOrders)
                .where(eq(changeOrders.id, parseInt(params.id)));
        return NextResponse.json("Profile sucsussfully updated");
    } catch (error) {
        return NextResponse.json(error);
    }
}