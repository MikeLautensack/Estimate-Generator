import { NextResponse } from "next/server";
import { JobsInsert } from "@/db/schemas/jobs";
import DIContainer from "@/core/DIContainer";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...jobData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 },
      );
    }

    await DIContainer.jobsUseCases.updateJob(id, jobData as JobsInsert);

    return NextResponse.json(
      { message: "Job updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 },
      );
    }

    await DIContainer.jobsUseCases.deleteJob(id);

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 },
    );
  }
}
