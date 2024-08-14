import { customers } from "../../../../db/schemas/customers";
import { db } from "../../../../db";
import { eq, sql } from "drizzle-orm";
import Link from "next/link";
import { Session } from "next-auth";
import { Customers } from "@/types/customers";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Button, Typography } from "@mui/material";
import ContractorsCustomersTable from "@/components/tables/contractorTables/customersTable/ContractorsCustomersTable";

async function getCustomers(session: Session, page: string, pageSize: string) {
  const size = parseInt(pageSize);
  const pageNum = parseInt(page) - 1;
  const offset = pageNum * size;
  const res = await db
    .select()
    .from(customers)
    .limit(size)
    .offset(offset)
    .where(eq(customers.contractor_user_id, session.user?.id));
  return res;
}

async function getTotalRows(session: Session) {
  const total = await db
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(customers)
    .where(eq(customers.contractor_user_id, session.user?.id));
  return total;
}

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ params, searchParams }: PageProps) => {
  const session = await auth();
  if (!session) return redirect("/signin");
  const page = searchParams["page"] as string;
  const pageSize = searchParams["pageSize"] as string;
  const data = (await getCustomers(session!, page!, pageSize!)) as Customers[];
  const totolRows = await getTotalRows(session!);

  console.log("testing searchParams", searchParams);

  return (
    <main className="flex-grow p-4 flex flex-col gap-4">
      <Typography variant="h4" color="primary" className="">
        Customers
      </Typography>
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/customers/form`}
        className="w-max"
      >
        <Button id="new-change-order-button" variant="contained">
          New Customer
        </Button>
      </Link>
      <ContractorsCustomersTable
        customers={data}
        page={page}
        pageSize={pageSize}
        totalRows={totolRows[0].count}
      />
    </main>
  );
};

export default Page;
