import React from 'react'
import '../css/Dashboard/EstimateStats.css'

const EstimateStats = () => {
  return (
    <div className='estimate-stats'>
        <h1 className='estimate-stats-heading'>Estimates</h1>
        <p className='estimate-stats-text'>Total Estimates:</p><p></p>
        <p className='estimate-stats-text'>Recent Estimates:</p><p></p>
        <p className='estimate-stats-text'>Estimates in Progress:</p><p></p>
        <p className='estimate-stats-text'>Average estimate tital:</p><p></p>
        <div className='new-estimate-button-container'>
          <button className='stats-new-estimate-button'>New Estimate</button>
        </div>
    </div>
  )
}

export default EstimateStats