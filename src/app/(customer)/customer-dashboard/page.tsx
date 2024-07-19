import DashboardTabs from "@/components/pageComponents/customer-dashboard/DashboardTabs";
import { Typography } from "@mui/material";
import { auth } from "../../../../auth";
import { Session } from "next-auth";
import { estimates } from "@/db/schemas/estimates";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { changeOrders } from "@/db/schemas/changeOrders";

async function getEstimates(session: Session) {
  const res = await db
    .select()
    .from(estimates)
    .where(eq(estimates.customer_user_id, session.user.id));
  return res;
}

async function getChangeOrders(session: Session) {
  const res = await db
    .select()
    .from(changeOrders)
    .where(eq(changeOrders.customer_user_id, session.user.id));
  return res;
}

const Page = async () => {
  const session = await auth();
  const estimates = await getEstimates(session!);
  const changeOrders = await getChangeOrders(session!);

  return (
    <main className="flex flex-col p-4 flex-grow w-full h-[calc(100vh-56px)]">
      <Typography variant="h4" color="primary" className="">
        Customer Dashboard
      </Typography>
      <DashboardTabs estimates={estimates} changeOrders={changeOrders} />
    </main>
  );
};

export default Page;
