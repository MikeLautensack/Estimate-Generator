import DIContainer from "@/core/IoCContainer";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const user = await DIContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get request body data
    const body = await request.json();

    const profile = {
      user_id: user.id,
      profileImgKey: body.profileImgKey,
      profileImgUrl: body.profileImgUrl,
      businessAddress: body.businessAddress,
      businessAddress2: body.businessAddress2,
      businessCity: body.businessCity,
      businessState: body.businessState,
      businessZip: body.businessZip,
      businessEmail: body.businessEmail,
      businessName: body.businessName,
      businessPhone: body.businessPhone,
      updatedAt: new Date(),
    };

    // Update profile resource
    await DIContainer.profilesUseCases.updateProfile(params.id, profile);

    return NextResponse.json(
      { message: "Profile successfully updated", profile: profile },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Get authenticated user
    const user = await DIContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await DIContainer.profilesUseCases.deleteProfile(params.id);

    return NextResponse.json(
      { message: "Profile successfully deleted" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
