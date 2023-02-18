import React from 'react'
import Customer from '../Customer'
import '../css/Customers/CustomerContent.css'

const CustomerContent = () => {
  return (
    <div className='customer-content-component'>
        <div className='customer-content-component-top'>
          <h1 className='customer-heading'>Customers</h1>
          <button className='new-customer-button'>New Customer</button>
        </div>
        <div className='customers-card'>
            <div className='customer-list'>
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
                <Customer />
                <Customer />
                <Customer />
            </div>
        </div>
    </div>
  )
}

export default CustomerContent