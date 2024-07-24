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

const Page = async () => {
  const session = await auth();
  if (!session) return redirect("/signin");
  return (
    <main className={`p-4 flex flex-col flex-grow gap-2 h-[calc(100vh-56px)]`}>
      <Typography variant="h4" color="primary" className="">
        Dashboard
      </Typography>
      <div className="flex flex-col gap-4 flex-1">
        <div className="grid gap-4 desktop:grid-cols-4">
          <TotalEsimated />
          <TotalCustomers />
          <TotalEstimates />
          <TotalChangeOrders />
        </div>
        <div className="grid gap-4 tablet:grid-cols-2 flex-1">
          <EstimatePriceChartContainer />
          <HighProfitCustomersChartContainer />
        </div>
      </div>
    </main>
  );
};

export default Page;
