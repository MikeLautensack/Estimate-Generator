import Link from "next/link";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Button, Typography } from "@mui/material";
import ContractorJobsTable from "@/components/tables/contractorTables/jobsTable/ContractorJobsTable";
import DIContainer from "@/core/DIContainer";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  const session = await auth();
  if (!session) return redirect("/signin");
  const page = searchParams["page"] as string;
  const pageSize = searchParams["pageSize"] as string;
  const data = await DIContainer.jobsUseCases.getJobsByUserRole(
    session.user.id,
    session.user.role,
    Number(pageSize),
  );

  return (
    <main className="flex flex-col flex-grow gap-4 p-4">
      <Typography variant="h4" color="primary" className="">
        Jobs
      </Typography>
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/estimates/form`}
      >
        <Button id="new-change-order-button" variant="contained">
          New Job
        </Button>
      </Link>
      <ContractorJobsTable
        jobs={data}
        page={page}
        pageSize={pageSize}
        totalRows={data.length}
      />
    </main>
  );
}
