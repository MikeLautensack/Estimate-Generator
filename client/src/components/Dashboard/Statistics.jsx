import React from 'react'
import CustomerStats from './CustomerStats'
import EstimateStats from './EstimateStats'
import '../css/Dashboard/Statistics.css'

const Statistics = () => {
  return (
    <div className='statistics'>
      <h1 className='statistics-heading'>Statistics</h1>
      <div className='stat-cards'>
        <CustomerStats />
        <EstimateStats />
      </div>
    </div>
  )
}

export default Statistics