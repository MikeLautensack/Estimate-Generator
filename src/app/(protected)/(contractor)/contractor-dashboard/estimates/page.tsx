import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Typography } from "@mui/material";
import ContractorEstimatesTable from "@/components/tables/contractorTables/estimatesTable/ContractorEstimatesTable";
import DIContainer from "@/core/IoCContainer";
import NewEstimateButton from "@/components/misc/NewEstimateButton";
type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");

  const sp = await searchParams;
  const page = sp.page as string;
  const pageSize = sp.pageSize as string;

  const estimates = await DIContainer.estimatesUseCases.getEstimates(
    page,
    pageSize,
    {},
  );

  return (
    <main className="flex flex-col flex-grow gap-4 p-4">
      <Typography variant="h4" color="primary" className="">
        Estimates
      </Typography>
      <NewEstimateButton />
      <ContractorEstimatesTable
        estimates={estimates}
        page={page}
        pageSize={pageSize}
        totalRows={estimates.length}
      />
    </main>
  );
}
