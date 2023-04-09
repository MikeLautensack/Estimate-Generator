import React, { useState } from 'react'
import './css/RecentCustomers.css'
import RecentCustomer from './RecentCustomer'

const RecentCustomers = ({ calculateRecentCustomers,
                           recentCustomers }) => {

  const handleSelectChange = (event) => {
      calculateRecentCustomers(event.target.value)
  }

  return (
    <div className='recent-customers-card'>
      <h1 className='recent-customers-card-heading'>Recent Customers</h1>
      <select className='recent-customers-select' onChange={handleSelectChange}>
        <option value='1 Day'>1 Day</option>
        <option value='7 Days'>7 Days</option>
        <option value='30 Days'>30 Days</option>
      </select>
      <ul className='recent-customers-list'>
        {recentCustomers.map((customer) => (
          <li key={customer._id}>
            <RecentCustomer customer={customer}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentCustomers