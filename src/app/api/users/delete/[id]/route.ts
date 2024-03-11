import { eq } from "drizzle-orm";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/schemas/auth";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await db.delete(users)
                .where(eq(users.id, params.id));
        return NextResponse.json("User deleted");
    } catch (error) {
        console.log(error);
    }
}