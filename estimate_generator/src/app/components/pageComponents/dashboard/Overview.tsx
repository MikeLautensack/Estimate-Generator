import EstimateStatsGraph from "./EstimateStatsGraph"
import HighProfitCustomersGraph from "./HighProfitCustomersGraph"
import NewCustomersGraph from "./NewCustomersGraph"
import NewEstimateGraph from "./NewEstimateGraph"
import SmallStatCard from "./SmallStatCard"

export default function Overview() {

  const SMALLSTATCARDDATA = [
    {
        heading: '',
        data: ''
    },
    {
        heading: '',
        data: ''
    },
    {
        heading: '',
        data: ''
    },
    {
        heading: '',
        data: ''
    }
  ]

  return (
    <div className=''>
        <div className=''>
            {SMALLSTATCARDDATA.map((statCard) => (
                <SmallStatCard
                    heading={statCard.heading} 
                    data={statCard.data} 
                />
            ))}
        </div>
        <div className=''>
            <NewCustomersGraph />
            <NewEstimateGraph />
            <HighProfitCustomersGraph />
            <EstimateStatsGraph />
        </div>
    </div>
  )
}
