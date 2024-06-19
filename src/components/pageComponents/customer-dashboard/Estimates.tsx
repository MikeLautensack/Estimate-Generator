import EstimatesTable from "@/components/tables/customerTables/estimatesTable/EstimatesTable";
import { Estimates as EstimateType } from "@/types/estimates";
import { columns } from "@/components/tables/customerTables/estimatesTable/columns";
import { estimates } from "../../../db/schemas/estimates";
import { db } from "../../../db";
import { eq } from "drizzle-orm";
import { Session } from "next-auth";
import { auth } from "../../../../auth";

async function getData(session: Session) {
  const res = await db
    .select()
    .from(estimates)
    .where(eq(estimates.customer_user_id, session.user.id));
  return res;
}

const Estimates = async () => {
  const session = await auth();
  const data = await getData(session!) as EstimateType[];

  return (
    <div className="">
      <h1 className="font-base text-primary900 font-medium">Estimates</h1>
      <div>
        <EstimatesTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Estimates;
