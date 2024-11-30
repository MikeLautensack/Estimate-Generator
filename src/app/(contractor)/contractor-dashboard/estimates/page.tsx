import { estimates } from "../../../../db/schemas/estimates";
import { db } from "../../../../db";
import { Estimates } from "@/types/estimates";
import Link from "next/link";
import { eq, sql } from "drizzle-orm";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Button, Typography } from "@mui/material";
import ContractorEstimatesTable from "@/components/tables/contractorTables/estimatesTable/ContractorEstimatesTable";
import { Session } from "next-auth";

async function getEstimates(session: Session, page: string, pageSize: string) {
  const size = parseInt(pageSize);
  const pageNum = parseInt(page) - 1;
  const offset = pageNum * size;
  const res = await db
    .select()
    .from(estimates)
    .limit(size)
    .offset(offset)
    .where(eq(estimates.contractor_user_id, session.user?.id));
  return res;
}

async function getTotalRows(session: Session) {
  const total = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(estimates)
    .where(eq(estimates.contractor_user_id, session.user?.id));
  return total;
}

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  const session = await auth();
  if (!session) return redirect("/signin");
  const page = searchParams["page"] as string;
  const pageSize = searchParams["pageSize"] as string;
  const data = (await getEstimates(session, page, pageSize)) as Estimates[];
  const totolRows = await getTotalRows(session!);

  return (
    <main className="flex flex-col flex-grow gap-4 p-4">
      <Typography variant="h4" color="primary" className="">
        Estimates
      </Typography>
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/estimates/form`}
      >
        <Button id="new-change-order-button" variant="contained">
          New Estimate
        </Button>
      </Link>
      <ContractorEstimatesTable
        estimates={data}
        page={page}
        pageSize={pageSize}
        totalRows={totolRows[0].count}
      />
    </main>
  );
}
