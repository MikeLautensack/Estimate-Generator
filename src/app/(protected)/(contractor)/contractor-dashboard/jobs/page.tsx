import { redirect } from "next/navigation";
import { Typography, Box, Paper } from "@mui/material";
import DIContainer from "@/core/DIContainer";
import { Suspense } from "react";
import ActiveJobsData from "@/components/dataComponents/jobs/ActiveJobsData";
import PendingJobsData from "@/components/dataComponents/jobs/PendingJobsData";
import AllJobsData from "@/components/dataComponents/jobs/AllJobsData";
import JobFormWrapper from "@/components/wrappers/JobFormWrapper";
import { JobsFormProvider } from "@/contexts/JobsFormProvider";
import NewJobButton from "@/components/misc/NewJobButton";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  // Auth
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

  // Search Params
  const activeJobsPage = (await searchParams).activeJobsPage;
  const activeJobsPageSize = (await searchParams).activeJobsPageSize;
  const pendingJobsPage = (await searchParams).pendingJobsPage;
  const pendingJobsPageSize = (await searchParams).pendingJobsPageSize;
  const allJobsPage = (await searchParams).allJobsPage;
  const allJobsPageSize = (await searchParams).allJobsPageSize;

  // Values
  const id = user.id;

  return (
    <main className="flex flex-col flex-grow gap-4 p-4 h-full">
      <JobsFormProvider>
        <JobFormWrapper>
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h4" color="primary">
              Jobs Dashboard
            </Typography>
            <NewJobButton />
          </Box>

          <Box className="grid grid-cols-1 gap-6">
            <Typography variant="h6" color="primary" className="mb-4">
              Active Jobs
            </Typography>
            <Suspense fallback={<div>loading...</div>}>
              <ActiveJobsData
                id={id}
                activeJobsPage={activeJobsPage}
                activeJobsPageSize={activeJobsPageSize}
              />
            </Suspense>

            <Typography variant="h6" color="primary" className="mb-4">
              Pending Jobs
            </Typography>
            <Suspense fallback={<div>loading...</div>}>
              <PendingJobsData
                id={id}
                pendingJobsPage={pendingJobsPage}
                pendingJobsPageSize={pendingJobsPageSize}
              />
            </Suspense>

            <Typography variant="h6" color="primary" className="mb-4">
              All Jobs
            </Typography>
            <Suspense fallback={<div>loading...</div>}>
              <AllJobsData
                id={id}
                allJobsPage={allJobsPage}
                allJobsPageSize={allJobsPageSize}
              />
            </Suspense>
          </Box>
        </JobFormWrapper>
      </JobsFormProvider>
    </main>
  );
}
