import ContractorJobsTable from "@/components/tables/contractorTables/jobsTable/ContractorJobsTable";
import DIContainer from "@/core/DIContainer";

async function getAllJobs(
  id: string,
  allJobsPage: string,
  allJobsPageSize: string,
) {
  return await DIContainer.jobsUseCases.getContractorsJobs(
    id,
    allJobsPage,
    allJobsPageSize,
  );
}

type AllJobsDataProps = {
  id: string;
  allJobsPage: string | string[] | undefined;
  allJobsPageSize: string | string[] | undefined;
};

export default async function AllJobsData({
  id,
  allJobsPage,
  allJobsPageSize,
}: AllJobsDataProps) {
  const page = allJobsPage ? (allJobsPage as string) : "1";
  const pageSize = allJobsPageSize ? (allJobsPageSize as string) : "10";
  const allJobs = await getAllJobs(id, page, pageSize);

  return (
    <ContractorJobsTable
      jobs={allJobs}
      page={page}
      pageSize={pageSize}
      totalRows={allJobs.length}
    />
  );
}
