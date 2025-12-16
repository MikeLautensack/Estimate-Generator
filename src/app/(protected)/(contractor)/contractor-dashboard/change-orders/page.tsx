import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Typography } from "@mui/material";
import { ChangeOrder } from "@/types/changeOrders";
import { changeOrders } from "@/db/schemas/changeOrders";
import { db } from "@/db";
import { Session } from "next-auth";
import { eq, sql } from "drizzle-orm";
import ContractorChangeOrderTable from "@/components/tables/contractorTables/changeOrderTable/ContractorChangeOrderTable";

async function getChangeOrders(
  session: Session,
  page: string,
  pageSize: string,
) {
  const size = parseInt(pageSize);
  const pageNum = parseInt(page) - 1;
  const offset = pageNum * size;
  const res = await db
    .select()
    .from(changeOrders)
    .limit(size)
    .offset(offset)
    .where(eq(changeOrders.contractor_user_id, session.user?.id));
  return res;
}

async function getTotalRows(session: Session) {
  const total = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(changeOrders)
    .where(eq(changeOrders.contractor_user_id, session.user?.id));
  return total;
}

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({ params, searchParams }: PageProps) {
  const session = await auth();
  if (!session) return redirect("/signin");
  const page = searchParams["page"] as string;
  const pageSize = searchParams["pageSize"] as string;
  const data = (await getChangeOrders(
    session!,
    page!,
    pageSize!,
  )) as ChangeOrder[];
  const totolRows = await getTotalRows(session!);

  return (
    <main className="flex flex-col gap-4 justify-start items-start p-8 w-full">
      <Typography variant="h4" color="primary" className="">
        Change Orders
      </Typography>
      <ContractorChangeOrderTable
        changeOrders={data}
        page={page}
        pageSize={pageSize}
        totalRows={totolRows[0].count}
      />
    </main>
  );
}
