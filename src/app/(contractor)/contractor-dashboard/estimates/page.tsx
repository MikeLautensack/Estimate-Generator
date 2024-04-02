import EstimatesTable from "@/components/tables/contractorTables/estimatesTable/EstimatesTable";
import { columns } from "@/components/tables/contractorTables/estimatesTable/columns";
import { estimates } from "../../../../db/schemas/estimates";
import { db } from "../../../../db";
import { Estimates } from "@/types/estimates";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function getData(session: any) {
  const res = await db
    .select()
    .from(estimates)
    .where(eq(estimates.contractor_user_id, session.user.id));
  return res;
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const data = (await getData(session)) as Estimates[];

  return (
    <main className="flex flex-col flex-1 gap-4 p-4 bg-neutral400">
      <h1 className="text-2xl desktop:text-[42px] font-bold text-black">
        Estimates
      </h1>
      <Link href={`${process.env["ESTIMATES_FORM_URL"] as string}`}>
        <Button
          id="new-change-order-button"
          className="flex-1 bg-blue-500 text-secondary500 font-medium"
          variant={"outline"}
        >
          New Estimate
        </Button>
      </Link>
      <EstimatesTable columns={columns} data={data} />
    </main>
  );
}
