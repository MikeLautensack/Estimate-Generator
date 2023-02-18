import React from 'react'
import '../css/Dashboard/RecentEstimates.css'
import Estimate from '../Estimate'

const RecentEstimates = () => {
  return (
    <div className='recent-estimates-card'>
      <h1>Recent Estimates</h1>
      <div className='recent-estimates-list'>
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
        <Estimate />
      </div>
    </div>
  )
}

export default RecentEstimates