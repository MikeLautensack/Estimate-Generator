import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import '../css/Dashboard/Dashboard.css'
import { FaBars, FaTimes } from 'react-icons/fa'

const Dashboard = () => {
  const [navVis, setNavVis] = useState(false)
  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }
  return (
    <div className='dashboard'>
      <button className='dashboard-nav-button' onClick={changeNavVis}><FaBars /></button>
      <div className='dashboard-nav' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='dashboard-content'>
    
      </div>
    </div>
  )
}

export default Dashboard