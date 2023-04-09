import React from 'react'
import './css/RecentEstimate.css'

const RecentEstimate = ({ estimate }) => {
  return (
    <div className='recent-estimate'>
        <h1 className='recent-estimate-name'>{estimate.estimateName}</h1>
        <h2 className='recent-estimate-email'>{estimate.customerName}</h2>
        <h3 className='recent-estimate-phone'>{estimate.address}</h3>
    </div>
  )
}

export default RecentEstimate