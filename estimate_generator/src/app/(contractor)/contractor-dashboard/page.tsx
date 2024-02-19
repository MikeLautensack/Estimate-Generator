import TotalCustomers from "@/components/pageComponents/contractor-dashboard/TotalCustomers";
import EstimateStatsGraph from "../../../components/pageComponents/contractor-dashboard/EstimateStatusGraph";
import HighProfitCustomersChartContainer from "../../../components/pageComponents/contractor-dashboard/HighProfitCustomerChartContainer";
import TotalEstimates from "@/components/pageComponents/contractor-dashboard/TotalEstimates";
import TotalChangeOrders from "@/components/pageComponents/contractor-dashboard/TotalChangeOrders";
import TotalEstimateEmails from "@/components/pageComponents/contractor-dashboard/TotalEstimateEmails";
import EstimateStatusChartContainer from "@/components/pageComponents/contractor-dashboard/EstimateStatusChartContainer";
import EstimatePriceChartContainer from "@/components/pageComponents/contractor-dashboard/EstimatePriceChartContainer";

export default function Page() {
  return (
    <main className="flex-1 p-4 flex flex-col gap-4 bg-neutral400 min-h-screen">
        <h1 className="text-2xl desktop:text-[42px] font-bold text-black">Dashboard</h1>
        <div className="flex flex-col gap-4 flex-1">
          <div className="grid gap-4 desktop:grid-cols-4">
              <TotalCustomers />
              <TotalEstimates />
              <TotalChangeOrders />
              <TotalEstimateEmails />
          </div>
          <div className="grid gap-4 tablet:grid-cols-2 flex-1">
              <EstimateStatusChartContainer />
              <EstimatePriceChartContainer />
              <HighProfitCustomersChartContainer />
              <EstimateStatsGraph />
          </div>
        </div>
    </main>
  )
}