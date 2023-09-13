import EstimateStatsGraph from "./EstimateStatsGraph"
import HighProfitCustomersGraph from "./HighProfitCustomersGraph"
import NewCustomersGraph from "./NewCustomersGraph"
import NewEstimateGraph from "./NewEstimateGraph"
import SmallStatCard from "./SmallStatCard"
import { SMALLSTATCARDDATA } from "@/utils/content"

export default function Overview() {

  return (
    <div className='flex flex-col gap-4'>
        <div className='grid gap-4 desktop:grid-cols-4'>
            {SMALLSTATCARDDATA.map((statCard) => (
                <SmallStatCard
                    heading={statCard.heading} 
                    data={statCard.data} 
                />
            ))}
        </div>
        <div className='grid gap-4 desktop:grid-cols-2'>
            <NewCustomersGraph />
            <NewEstimateGraph />
            <HighProfitCustomersGraph />
            <EstimateStatsGraph />
        </div>
    </div>
  )
}
