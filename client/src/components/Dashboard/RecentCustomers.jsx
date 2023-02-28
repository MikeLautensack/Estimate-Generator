import React from 'react'
import './css/RecentCustomers.css'
import Customer from '../Customers/Customer'

const RecentCustomers = () => {
  return (
    <div className='recent-customers-card'>
      <h1>Recent Customers</h1>
      <div className='recent-customers-list'>
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
        <Customer />
      </div>
    </div>
  )
}

export default RecentCustomers