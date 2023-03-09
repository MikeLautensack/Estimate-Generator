import React from 'react'
import './css/RecentEstimates.css'
import EstimateListItem from '../Estimates/EstimateListItem'
import UserContext from '../../context/DataContext'
import { useReducer, useContext, useEffect } from 'react'

const RecentEstimates = () => {
  
  const userData = useContext(UserContext)
  const { estimates, setEstimates } = userData

  return (
    <div className='recent-estimates-card'>
      <h1>Recent Estimates</h1>
      <ul className='recent-estimates-list'>
        {estimates.map((estimate) => (
          <li key={estimate.id}>
            <EstimateListItem estimate={estimate} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentEstimates