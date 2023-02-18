import React from 'react'
import '../css/Dashboard/CustomerStats.css'

const CustomerStats = () => {
  return (
    <div className='customer-stats'>
        <h1 className='customer-stats-heading'>Customers</h1>
        <p className='customer-stats-text'>Total Customers:</p><p></p>
        <p className='customer-stats-text'>Recent Customers:</p><p></p>
        <p className='customer-stats-text'>Repeat Customers:</p><p></p>
        <p className='customer-stats-text'>Average # of Estimates:</p><p></p>
        <div className='new-customer-button-container'>
          <button className='stats-new-customer-button'>New Customer</button>
        </div>
    </div>
  )
}

export default CustomerStats