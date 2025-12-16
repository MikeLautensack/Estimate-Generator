import { NextRequest, NextResponse } from "next/server";
import IoCContainer from "@/core/IoCContainer";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await IoCContainer.estimatesUseCases.deleteEstimate(params.id);

    return NextResponse.json(
      { message: "Estimate successfully deleted" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
