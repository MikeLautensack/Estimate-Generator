import React from 'react'
import './css/Nav.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import DataContext from '../../context/DataContext.jsx'

const Nav = () => {

  const nav = useNavigate()
  const { setUser, setJWT, setCustomers, setEstimates } = useContext(DataContext)

  const logoutUser = () => {
    setUser({})
    setJWT('')
    setCustomers([])
    setEstimates([])
    nav('/')
  }

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
        <div>
          <div className='logout' onClick={() => logoutUser()}>
            <FaSignOutAlt />
            <h4>Sign Out</h4>
          </div>
        </div>
    </div>
  )
}

export default Nav