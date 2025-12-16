import { NextRequest, NextResponse } from "next/server";
import IoCContainer from "@/core/IoCContainer";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await IoCContainer.authUseCases.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get request body data
    const body = await request.json();

    // Create profile resource
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
    };

    await IoCContainer.profilesUseCases.createProfile(profile);

    return NextResponse.json(
      { message: "Profile successfully created" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
