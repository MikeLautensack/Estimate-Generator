import ContractorJobsTable from "@/components/tables/contractorTables/jobsTable/ContractorJobsTable";
import DIContainer from "@/core/IoCContainer";

async function getPendingJobs(
  id: string,
  pendingJobsPage: string,
  pendingJobsPageSize: string,
) {
  return await DIContainer.jobsUseCases.getContractorsPendingJobs(
    id,
    pendingJobsPage,
    pendingJobsPageSize,
  );
}

type PendingJobsDataProps = {
  id: string;
  pendingJobsPage: string | string[] | undefined;
  pendingJobsPageSize: string | string[] | undefined;
};

export default async function PendingJobsData({
  id,
  pendingJobsPage,
  pendingJobsPageSize,
}: PendingJobsDataProps) {
  const page = pendingJobsPage ? (pendingJobsPage as string) : "1";
  const pageSize = pendingJobsPageSize ? (pendingJobsPageSize as string) : "10";
  const pendingJobs = await getPendingJobs(id, page, pageSize);

  return (
    <ContractorJobsTable
      jobs={pendingJobs}
      page={page}
      pageSize={pageSize}
      totalRows={pendingJobs.length}
    />
  );
}
