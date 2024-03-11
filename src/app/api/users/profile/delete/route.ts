import { NextResponse } from "next/server";
import { profiles } from "../../../../../db/schemas/userProfile";
import { db } from "../../../../../db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../../utils/authOptions";
import { eq } from "drizzle-orm";

export async function DELETE() {

    const session = await getServerSession(authOptions);

    try {
        await db.delete(profiles)
                .where(eq(profiles.user_id, session.user.id));
        return NextResponse.json("Profile sucsessfully deleted");
    } catch (error) {
        return NextResponse.json(error);
    }
}