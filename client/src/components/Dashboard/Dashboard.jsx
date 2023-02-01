import React from 'react'
import Nav from '../../components/Nav'
import CustomerStats from './CustomerStats'
import EstimateStats from './EstimateStats'
import RecentCustomers from './RecentCustomers'
import RecentEstimates from './RecentEstimates'
import UserInfo from './UserInfo'

const Dashboard = () => {
  return (
    <div className='flex h-screen bg-white'>
      <div className='w-[20%]'>
        <Nav />
      </div>  
      <div className='grid grid-cols-3 gap-2 m-2 w-[80%]'>
        <UserInfo />
        <CustomerStats />
        <EstimateStats />
        <RecentCustomers />
        <RecentEstimates />
      </div>
    </div>
  )
}

export default Dashboard