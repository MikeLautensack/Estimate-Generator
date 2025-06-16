import { NextResponse } from "next/server";
import { JobsInsert } from "@/db/schemas/jobs";
import DIContainer from "@/core/DIContainer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jobData: JobsInsert = body;

    await DIContainer.jobsUseCases.createJob(jobData);

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
