import React from 'react'
import './css/RecentCustomers.css'
import Customer from '../Customers/Customer'
import UserContext from '../../context/DataContext'
import { useReducer, useContext, useEffect } from 'react'

const RecentCustomers = () => {

  const userData = useContext(UserContext)
  const { customers, setCustomers } = userData

  return (
    <div className='recent-customers-card'>
      <h1>Recent Customers</h1>
      <ul className='recent-customers-list'>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Customer 
                  customer={customer}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentCustomers