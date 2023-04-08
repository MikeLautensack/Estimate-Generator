import React from 'react'
import './css/Statistics.css'
import DataContext from '../../context/DataContext'
import { useContext } from 'react'

const Statistics = ({ recentCustomers, recentEstimates }) => {

  const data = useContext(DataContext)
  const { customers, estimates } = data

  const calcAveEstTotal = () => {
    if (estimates.length === 0) {
      return 0
    }
    let aveTotal = 0
    estimates.forEach((estimate) => {
      aveTotal += estimate.total
    });
    aveTotal = aveTotal / estimates.length
    return aveTotal
  }

  const estimatesPerCustomer = () => {
    let result = 0
    let acc = 0
    if (customers.length === 0) {
      return 0
    }
    customers.forEach((customer) => {
      let estPerCustomer = 0
      estimates.forEach((estimate) => {
        if(customer.name === estimate.customerName) {
          estPerCustomer += 1
        }
      })
      acc += estPerCustomer
    })
    result = acc / customers.length
    return result
  }

  return (
    <div className='statistics'>
      <h1 className='statistics-heading'>Statistics</h1>
      <div className='stat-cards'>
        <div className='customer-statistics-card'>
          <h2 className='customer-stats-heading'>Customers</h2>
          <div className='customer-stats-cards'>
            <div className="stat-card">
              <h3>{customers.length}</h3>
              <h4>Total Customers:</h4>
            </div>
            <div className="stat-card">
              <h3>{recentCustomers.length}</h3>
              <h4>Recent Customers:</h4>
            </div>
            <div className="stat-card">
              <h3>{estimatesPerCustomer().toFixed(1)}</h3>
              <h4>Estimates Per Customer:</h4>
            </div>      
          </div>
          <div className='new-customer-button-container'>
            <button className='stats-new-customer-button'>New Customer</button>
          </div>
        </div>
        <div className='estimate-statistics-card'>
          <h2 className='estimate-stats-heading'>Estimates</h2>
          <div className='estimate-stats-cards'>
            <div className="stat-card">
              <h3>{estimates.length}</h3>
              <h4>Total Estimates:</h4>
            </div>
            <div className="stat-card">
              <h3>{recentEstimates.length}</h3>
              <h4>Recent Estimates:</h4>
            </div>
            <div className="stat-card">
              <h3>{`$${calcAveEstTotal().toFixed(2)}`}</h3>
              <h4>Average Total:</h4>
            </div>
          </div>
          <div className='new-estimate-button-container'>
            <button className='stats-new-estimate-button'>New Estimate</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics