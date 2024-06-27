import CustomersTable from "@/components/tables/contractorTables/customersTable/CustomersTable";
import { columns } from "@/components/tables/contractorTables/customersTable/columns";
import { customers } from "../../../../db/schemas/customers";
import { db } from "../../../../db";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Session } from "next-auth";
import { Customers } from "@/types/customers";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Button, Typography } from "@mui/material";

async function getData(session: Session) {
  const res = await db
    .select()
    .from(customers)
    .where(eq(customers.contractor_user_id, session.user?.id));
  return res;
}

const Page = async () => {
  const session = await auth();
  if (!session) return redirect("/signin");
  const data = (await getData(session!)) as Customers[];

  return (
    <main className="flex-grow p-4 flex flex-col gap-4">
      <Typography variant="h4" color="primary" className="">
        Customers
      </Typography>
      <Link
        href={`${process.env.NEXT_PUBLIC_HOST}/contractor-dashboard/customers/form`}
      >
        <Button id="new-change-order-button" variant="contained">
          New Customer
        </Button>
      </Link>
      <CustomersTable columns={columns} data={data} />
    </main>
  );
};

export default Page;
