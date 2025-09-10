import { NextResponse } from "next/server";
import { JobsInsert } from "@/db/schemas/jobs";
import IoCContainer from "@/core/IoCContainer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get the current user
    const user = await IoCContainer.authUseCases.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const jobData: JobsInsert = {
      ...body,
      contractor_user_id: user.id,
      // Ensure optional fields are properly handled
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      address: body.address || null,
    };

    console.log("Creating job with data:", jobData);

    await IoCContainer.jobsUseCases.createJob(jobData);

    return NextResponse.json(
      { message: "Job created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 },
    );
  }
}
