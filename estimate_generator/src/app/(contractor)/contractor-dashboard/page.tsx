import TotalCustomers from "@/components/pageComponents/contractor-dashboard/TotalCustomers"
import EstimateStatsGraph from "../../../components/pageComponents/contractor-dashboard/EstimateStatsGraph"
import HighProfitCustomersGraph from "../../../components/pageComponents/contractor-dashboard/HighProfitCustomersGraph"
import NewEstimateGraph from "../../../components/pageComponents/contractor-dashboard/NewEstimateGraph"
import TotalEstimates from "@/components/pageComponents/contractor-dashboard/TotalEstimates"
import TotalChangeOrders from "@/components/pageComponents/contractor-dashboard/TotalChangeOrders"
import TotalEstimateEmails from "@/components/pageComponents/contractor-dashboard/TotalEstimateEmails"

export default function Page() {
  return (
    <main className='bg-gradient-to-br from-primary200 to-secondary200 flex-grow p-4 flex flex-col gap-4'>
        <h1 className='text-2xl desktop:text-[42px] font-bold font-sans text-primary500'>Dashboard</h1>
        <div className='flex flex-col gap-4'>
          <div className='grid gap-4 desktop:grid-cols-4'>
              <TotalCustomers />
              <TotalEstimates />
              <TotalChangeOrders />
              <TotalEstimateEmails />
          </div>
          <div className='grid gap-4 desktop:grid-cols-2'>
              <NewEstimateGraph />
              <HighProfitCustomersGraph />
              <EstimateStatsGraph />
          </div>
        </div>
    </main>
  )
}