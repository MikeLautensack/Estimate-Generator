import TotalCustomers from "@/components/pageComponents/contractor-dashboard/TotalCustomers"
import EstimateStatsGraph from "../../../components/pageComponents/contractor-dashboard/EstimateStatusGraph"
import HighProfitCustomersGraph from "../../../components/pageComponents/contractor-dashboard/HighProfitCustomersGraph"
import TotalEstimates from "@/components/pageComponents/contractor-dashboard/TotalEstimates"
import TotalChangeOrders from "@/components/pageComponents/contractor-dashboard/TotalChangeOrders"
import TotalEstimateEmails from "@/components/pageComponents/contractor-dashboard/TotalEstimateEmails"
import EstimateStatusChartContainer from "@/components/pageComponents/contractor-dashboard/EstimateStatusChartContainer"
import EstimatePriceChartContainer from "@/components/pageComponents/contractor-dashboard/EstimatePriceChartContainer"

export default function Page() {
  return (
    <main className='bg-gradient-to-br from-primary200 to-secondary200 flex-grow p-4 flex flex-col gap-4'>
        <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Dashboard</h1>
        <div className='flex flex-col gap-4 border border-orange-600 flex-1'>
          <div className='grid gap-4 desktop:grid-cols-4 border border-pink-600'>
              <TotalCustomers />
              <TotalEstimates />
              <TotalChangeOrders />
              <TotalEstimateEmails />
          </div>
          <div className='grid gap-4 desktop:grid-cols-2 border border-purple-600 flex-1'>
              <EstimateStatusChartContainer />
              <EstimatePriceChartContainer />
              <HighProfitCustomersGraph />
              <EstimateStatsGraph />
          </div>
        </div>
    </main>
  )
}