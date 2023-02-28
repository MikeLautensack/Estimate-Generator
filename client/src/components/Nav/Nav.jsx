import React from 'react'
import './css/Nav.css'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='nav'>
        <div className='user'>
          <div className='img'>
            
          </div>
          <h6 className='username'>ColorCoatings LLC</h6>
        </div>
        <div className='nav-buttons'>
          <Link to='/dashboard'><button className='nav-button'>Dashboard</button></Link>
          <Link to='/customers'><button className='nav-button'>Customers</button></Link>
          <Link to='/estimates'><button className='nav-button'>Estimates</button></Link>
        </div>
    </div>
  )
}

export default Nav