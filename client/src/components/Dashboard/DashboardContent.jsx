import React from 'react'
import Statistics from './Statistics'
import RecentCustomers from './RecentCustomers'
import RecentEstimates from './RecentEstimates'
import '../css/Dashboard/DashboardContent.css'

const DashboardContent = () => {
  return (
    <div className='dashboard-content'>
        <Statistics />
        <RecentCustomers />
        <RecentEstimates />
    </div>
  )
}

export default DashboardContent