import EstimatesTable from "@/components/tables/customerTables/estimatesTable/EstimatesTable";
import { Estimates as EstimateType } from "@/types/estimates";
import { columns } from "@/components/tables/customerTables/estimatesTable/columns";
import { estimates } from "../../../db/schemas/estimates";
import { db } from "../../../db";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

async function getData(session: any) {
  const res = await db
    .select()
    .from(estimates)
    .where(eq(estimates.customer_user_id, session.user.id));
  return res;
}

const Estimates = async () => {
  const session = await getServerSession(authOptions);
  const data = (await getData(session)) as EstimateType[];

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
