import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import '../css/Dashboard/Dashboard.css'
import { FaBars } from 'react-icons/fa'
import Statistics from './Statistics'
import RecentCustomers from './RecentCustomers'
import RecentEstimates from './RecentEstimates'

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
      <button className='dashboard-sidebar-button' onClick={changeNavVis}><FaBars /></button>
      <div className='dashboard-sidebar' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='dashboard-content'>
        <Statistics />
        <RecentCustomers />
        <RecentEstimates />
      </div>
    </div>
  )
}

export default Dashboard