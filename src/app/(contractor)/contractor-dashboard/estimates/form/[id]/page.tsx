import { estimates, lineItems } from "@/db/schemas/estimates";
import { db } from "../../../../../../db";
import { eq } from "drizzle-orm";
import { customers } from "@/db/schemas/customers";
import { changeOrders } from "@/db/schemas/changeOrders";
import { ChangeOrder } from "@/types/changeOrders";
import { auth } from "../../../../../../../auth";
import { profiles } from "@/db/schemas/userProfile";
import EstimateForm from "@/components/forms/estimate-form/EstimateForm";
import { Typography } from "@mui/material";
import { Session } from "next-auth";

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

async function getCustomers(session: Session) {
  const res = await db
    .select()
    .from(customers)
    .where(eq(customers.contractor_user_id, session?.user.id));
  return res;
}

async function getProfile(id: string) {
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
  const session = await auth();
  const estimate = await getEstimate(parseInt(params.id));
  const customers = await getCustomers(session!);
  const profile = await getProfile(session?.user.id);
  const changeOrders = (await getChangeOrders(
    parseInt(params.id),
  )) as ChangeOrder[];

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start gap-4 w-full lg:w-[calc(100vw-258px)]">
      <Typography variant="h4" color="primary">
        Estimate Form
      </Typography>
      <EstimateForm
        estimate={{
          id: estimate.id.toString(),
          estimateName: estimate.estimateName ? estimate.estimateName : "",
          customerName: estimate.customerName ? estimate.customerName : "",
          customerEmail: estimate.customerEmail ? estimate.customerEmail : "",
          projectAddress: estimate.projectAddress
            ? estimate.projectAddress
            : "",
          contractorName: estimate.contractorName
            ? estimate.contractorName
            : "",
          contractorAddress: estimate.contractorAddress
            ? estimate.contractorAddress
            : "",
          contractorPhone: estimate.contractorPhone
            ? estimate.contractorPhone
            : "",
          lineItems: estimate.lineItems
            ? estimate.lineItems.map((item) => {
                return {
                  id: item.id.toString(),
                  item: item.item || "",
                  description: item.description || "",
                  quantity: item.quantity ? item.quantity.toString() : "0",
                  rateType: item.rateType || "",
                  price: item.price ? item.price.toString() : "0",
                  amount: item.amount ? item.amount.toString() : "0",
                };
              })
            : [],
          message: estimate.message ? estimate.message : "",
          subtotal: estimate.subtotal ? estimate.subtotal.toString() : "0",
          taxRate: estimate.taxRate ? estimate.taxRate.toString() : "0",
          tax: estimate.tax ? estimate.tax.toString() : "0",
          total: estimate.total ? estimate.total.toString() : "0",
          status: estimate.status ? estimate.status : "",
          customer_id: estimate.customer_id
            ? estimate.customer_id.toString()
            : "",
          customer_user_id: estimate.customer_user_id
            ? estimate.customer_user_id
            : "",
          contractor_user_id: estimate.contractor_user_id
            ? estimate.contractor_user_id
            : "",
        }}
        customers={customers}
        profile={profile[0]}
        changeOrders={changeOrders}
        mode="update-estimate"
      />
    </main>
  );
};

export default Page;
