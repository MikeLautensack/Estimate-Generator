import EstimatesTable from "@/components/tables/contractorTables/estimatesTable/EstimatesTable";
import { columns } from "@/components/tables/contractorTables/estimatesTable/columns";
import { estimates } from "../../../../db/schemas/estimates";
import { db } from "../../../../db";
import { Estimates } from "@/types/estimates";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";
import { Button, Typography } from "@mui/material";

async function getData(session: any) {
  const res = await db
    .select()
    .from(estimates)
    .where(eq(estimates.contractor_user_id, session?.user.id));
  return res;
}

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/signin");
  const data = (await getData(session)) as Estimates[];

  return (
    <main className="flex flex-col flex-grow gap-4 p-4">
      <Typography variant="h4" color="primary" className="">
        Estimates
      </Typography>
      <Link href={`${process.env.POST}/contractor-dashboard/estimates/form`}>
        <Button id="new-change-order-button" variant="contained">
          New Estimate
        </Button>
      </Link>
      <EstimatesTable columns={columns} data={data} />
    </main>
  );
}
