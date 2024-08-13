import TotalCustomers from "@/components/pageComponents/contractor-dashboard/TotalCustomers";
import EstimateStatsGraph from "../../../components/pageComponents/contractor-dashboard/EstimateStatusGraph";
import HighProfitCustomersChartContainer from "../../../components/pageComponents/contractor-dashboard/HighProfitCustomerChartContainer";
import TotalEstimates from "@/components/pageComponents/contractor-dashboard/TotalEstimates";
import TotalChangeOrders from "@/components/pageComponents/contractor-dashboard/TotalChangeOrders";
import TotalEstimateEmails from "@/components/pageComponents/contractor-dashboard/TotalEstimateEmails";
import EstimateStatusChartContainer from "@/components/pageComponents/contractor-dashboard/EstimateStatusChartContainer";
import EstimatePriceChartContainer from "@/components/pageComponents/contractor-dashboard/EstimatePriceChartContainer";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { Box, Card, Typography } from "@mui/material";
import TotalEsimated from "@/components/pageComponents/contractor-dashboard/TotalEsimated";
import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { Session } from "next-auth";
import { eq } from "drizzle-orm";
import { customers } from "@/db/schemas/customers";
import { changeOrders } from "@/db/schemas/changeOrders";
import EstimateStatusChart from "@/components/charts/EstimateStatusChart";
import RevenueChart from "@/components/charts/revenue-chart/RevenueChart";

async function getEstimates(session: Session) {
  try {
    const res = await db
      .select()
      .from(estimates)
      .where(eq(estimates.contractor_user_id, session.user.id));
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function getCustomers(session: Session) {
  try {
    const res = await db
      .select()
      .from(customers)
      .where(eq(customers.contractor_user_id, session.user.id));
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function getChangeOrders(session: Session) {
  try {
    const res = await db
      .select()
      .from(changeOrders)
      .where(eq(changeOrders.contractor_user_id, session.user.id));
    return res;
  } catch (error) {
    console.log(error);
  }
}

const Page = async () => {
  const session = await auth();
  if (!session) return redirect("/signin");

  const estimates = await getEstimates(session);
  const customers = await getCustomers(session);
  const changeOrders = await getChangeOrders(session);

  return (
    <main className={`p-4 flex flex-col flex-grow gap-2 h-[calc(100vh-56px)]`}>
      <Typography variant="h4" color="primary" className="">
        Dashboard
      </Typography>
      <div className="flex flex-col gap-4 flex-1">
        <div className="grid gap-4 desktop:grid-cols-4">
          <TotalEsimated estimates={estimates!} />
          <TotalCustomers customers={customers!} />
          <TotalEstimates estimates={estimates!} />
          <TotalChangeOrders changeOrders={changeOrders!} />
        </div>
        <div className="grid gap-4 tablet:grid-cols-2 flex-1">
          <RevenueChart estimates={estimates!} />
          <EstimateStatusChart estimates={estimates!} />
        </div>
      </div>
    </main>
  );
};

export default Page;
