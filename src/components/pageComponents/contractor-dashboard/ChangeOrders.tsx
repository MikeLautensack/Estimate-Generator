import { db } from "@/db";
import { ChangeOrder } from "@/types/changeOrders";
import { changeOrders } from "@/db/schemas/changeOrders";
import { eq } from "drizzle-orm";
import { auth } from "../../../../auth";
import ContractorChangeOrderTable from "@/components/tables/contractorTables/changeOrderTable/ContractorChangeOrderTable";

async function getChangeOrders(session: any) {
  try {
    const data = await db
      .select()
      .from(changeOrders)
      .where(eq(changeOrders.contractor_user_id, session.user.id));
    return data;
  } catch (error) {
    console.log(error);
  }
}

const ChangeOrders = async () => {
  const session = await auth();
  const data = (await getChangeOrders(session)) as ChangeOrder[];

  return (
    <div className="flex w-full">
      <ContractorChangeOrderTable changeOrders={data} />
    </div>
  );
};

export default ChangeOrders;
