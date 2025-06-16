import ContractorJobsTable from "@/components/tables/contractorTables/jobsTable/ContractorJobsTable";
import DIContainer from "@/core/DIContainer";

async function getActiveJobs(
  id: string,
  activeJobsPage: string,
  activeJobsPageSize: string,
) {
  return await DIContainer.jobsUseCases.getContractorsActiveJobs(
    id,
    activeJobsPage,
    activeJobsPageSize,
  );
}

type ActiveJobsDataProps = {
  id: string;
  activeJobsPage: string | string[] | undefined;
  activeJobsPageSize: string | string[] | undefined;
};

export default async function ActiveJobsData({
  id,
  activeJobsPage,
  activeJobsPageSize,
}: ActiveJobsDataProps) {
  const page = activeJobsPage ? (activeJobsPage as string) : "1";
  const pageSize = activeJobsPageSize ? (activeJobsPageSize as string) : "10";
  const activeJobs = await getActiveJobs(id, page, pageSize);

  return (
    <ContractorJobsTable
      jobs={activeJobs}
      page={page}
      pageSize={pageSize}
      totalRows={activeJobs.length}
    />
  );
}
