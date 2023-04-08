import React from 'react'
import './css/RecentEstimates.css'
import EstimateListItem from '../Estimates/EstimateListItem'

const RecentEstimates = ({ calculateRecentEstimates,
                           recentEstimates }) => {

  const handleSelectChange = (event) => {
      calculateRecentEstimates(event.target.value)
  }

  return (
    <div className='recent-estimates-card'>
      <div className='recent-estimate-heading-and-select'>
        <h1>Recent Estimates</h1>
        <select onChange={handleSelectChange}>
          <option value='1 Day'>1 Day</option>
          <option value='7 Days'>7 Days</option>
          <option value='30 Days'>30 Days</option>
        </select>
      </div>
      <ul className='recent-estimates-list'>
        {recentEstimates.map((estimate) => (
          <li key={estimate._id}>
            <EstimateListItem 
                estimate={estimate} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentEstimates