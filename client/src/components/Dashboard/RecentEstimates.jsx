import React from 'react'
import './css/RecentEstimates.css'
import RecentEstimate from './RecentEstimate'

const RecentEstimates = ({ calculateRecentEstimates,
                           recentEstimates }) => {

  const handleSelectChange = (event) => {
      calculateRecentEstimates(event.target.value)
  }

  return (
    <div className='recent-estimates-card'>
      <h1 className='recent-estimates-card-heading'>Recent Estimates</h1>
      <select defaultValue="7 Days" className='recent-estimates-select' onChange={handleSelectChange}>
        <option value='1 Day'>1 Day</option>
        <option value='7 Days'>7 Days</option>
        <option value='30 Days'>30 Days</option>
      </select>
      <ul className='recent-estimates-list'>
        {recentEstimates.map((estimate) => (
          <li key={estimate._id}>
            <RecentEstimate estimate={estimate}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentEstimates