import React from 'react'
import './css/RecentEstimates.css'
import EstimateListItem from '../Estimates/EstimateListItem'

const RecentEstimates = () => {
  return (
    <div className='recent-estimates-card'>
      <h1>Recent Estimates</h1>
      <div className='recent-estimates-list'>
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
        <EstimateListItem />
      </div>
    </div>
  )
}

export default RecentEstimates