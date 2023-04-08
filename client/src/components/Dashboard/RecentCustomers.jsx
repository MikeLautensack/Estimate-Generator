import React, { useState } from 'react'
import './css/RecentCustomers.css'
import Customer from '../Customers/Customer'

const RecentCustomers = ({ calculateRecentCustomers,
                           recentCustomers }) => {

  const handleSelectChange = (event) => {
      calculateRecentCustomers(event.target.value)
  }

  return (
    <div className='recent-customers-card'>
      <div className='recent-customer-heading-and-select'>
        <h1>Recent Customers</h1>
        <select onChange={handleSelectChange}>
          <option value='1 Day'>1 Day</option>
          <option value='7 Days'>7 Days</option>
          <option value='30 Days'>30 Days</option>
        </select>
      </div>
      <ul className='recent-customers-list'>
        {recentCustomers.map((customer) => (
          <li key={customer._id}>
            <Customer 
                  customer={customer}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentCustomers