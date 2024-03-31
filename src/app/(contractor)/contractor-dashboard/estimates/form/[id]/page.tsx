import { estimates, lineItems } from "@/db/schemas/estimates";
import { db } from "../../../../../../db";
import { eq } from "drizzle-orm";
import { customers } from "@/db/schemas/customers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../utils/authOptions";
import { profiles } from "@/db/schemas/userProfile";
import EstimateForm from "@/components/forms/EstimateForm";
import { changeOrders } from "@/db/schemas/changeOrders";
import { ChangeOrder } from "@/types/changeOrders";
import ChangeOrderRequests from "@/components/misc/ChangeOrderRequests";
import { checkChangeOrders, createArray } from "@/utils/changeOrderUtils";
import { Estimates } from "@/types/estimates";
import { Customers } from "@/types/customers";
import { Profile } from "@/types/profile";

async function getEstimate(id: number) {
  const estimateTableData = await db
    .select()
    .from(estimates)
    .where(eq(estimates.id, id));
  const lineItemsTableData = await db
    .select()
    .from(lineItems)
    .where(eq(lineItems.estimate_id, id));
  const res = {
    ...estimateTableData[0],
    lineItems: lineItemsTableData,
  };
  return res;
}

async function getCustomers(id: number) {
  const res = await db
    .select()
    .from(customers)
    .where(eq(customers.contractor_user_id, id));
  return res;
}

async function getProfile(id: number) {
  const res = await db.select().from(profiles).where(eq(profiles.user_id, id));
  return res;
}

async function getChangeOrders(id: number) {
  const res = await db
    .select()
    .from(changeOrders)
    .where(eq(changeOrders.estimate_id, id));
  return res;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const estimate = await getEstimate(parseInt(params.id));
  const customers = await getCustomers(session.user.id);
  const profile = await getProfile(session.user.id);
  const changeOrders = (await getChangeOrders(
    parseInt(params.id),
  )) as ChangeOrder[];

  return (
    <main className="flex flex-col desktop:w-[calc(100vw-256px)] desktop:flex-row-reverse gap-4 bg-neutral400 min-h-[calc(100vh-56px)] relative desktop:gap-0">
      {checkChangeOrders(changeOrders) ? (
        <ChangeOrderRequests changeOrders={createArray(changeOrders)} />
      ) : (
        <></>
      )}
      <div className="flex flex-col gap-4 w-full desktop:w-[calc(100%-24rem)] p-4">
        <h1 className="text-2xl desktop:text-[42px] font-bold text-black">
          Estimate Form
        </h1>
        <EstimateForm
          estimate={estimate as Estimates}
          customers={customers}
          profile={profile[0]}
          changeOrders={changeOrders as ChangeOrder[]}
        />
      </div>
    </main>
  );
};

export default Page;
