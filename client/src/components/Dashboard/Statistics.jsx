import React from 'react'
import '../css/Dashboard/Statistics.css'

const Statistics = () => {
  return (
    <div className='statistics'>
      <h1 className='statistics-heading'>Statistics</h1>
      <div className='stat-cards'>
        <div className='customer-statistics-card'>
          <h2 className='customer-stats-heading'>Customers</h2>
          <div className='customer-stats-cards'>
            <div className="stat-card">
              <h3>1</h3>
              <h4>Total Customers:</h4>
            </div>
            <div className="stat-card">
              <h3>2</h3>
              <h4>Recent Customers:</h4>
            </div>
            <div className="stat-card">
              <h3>3</h3>
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
              <h3>1</h3>
              <h4>Total Estimates:</h4>
            </div>
            <div className="stat-card">
              <h3>2</h3>
              <h4>Recent Estimates:</h4>
            </div>
            <div className="stat-card">
              <h3>$0.00</h3>
              <h4>Average estimate total:</h4>
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