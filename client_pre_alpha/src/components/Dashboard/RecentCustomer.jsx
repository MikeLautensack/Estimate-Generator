import React from 'react'
import './css/RecentCustomer.css'

const RecentCustomer = ({ customer }) => {
  return (
    <div className='recent-customer'>
        <h1 className='recent-customer-name'>{customer.name}</h1>
        <h2 className='recent-customer-email'>{customer.email}</h2>
        <h3 className='recent-customer-phone'>{customer.phone_number}</h3>
    </div>
  )
}

export default RecentCustomer