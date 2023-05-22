import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import './css/Dashboard.css'
import { FaBars } from 'react-icons/fa'
import Statistics from './Statistics'
import RecentCustomers from './RecentCustomers'
import RecentEstimates from './RecentEstimates'
import DataContext from '../../context/DataContext'
import { useContext, useEffect } from 'react'

const Dashboard = () => {

  const { customers, estimates } = useContext(DataContext)
  const [ recentCustomers, setRecentCustomers ] = useState([])
  const [ recentEstimates, setRecentEstimates ] = useState([])
  const [navVis, setNavVis] = useState(false)
  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }

  useEffect(() => {
    calculateRecentCustomers('7 Days')
    calculateRecentEstimates('7 Days')
  }, [customers, estimates])

  const calculateRecentCustomers = (filterSetting) => {
    const recentCustomers = customers.reduce((arr, customer) => {
      const today = new Date()
      const oneDayAgo = new Date(today.getTime() - (24 * 60 * 60 * 1000))
      const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000))
      const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000))
      if(filterSetting === '1 Day') {
          if(new Date(customer.dateModified).getTime() <= today.getTime() && new Date(customer.dateModified).getTime() >= oneDayAgo.getTime()) {
            return arr.concat(customer)
          } else {
            return arr
          }
      } else if (filterSetting === '7 Days') {
          if(new Date(customer.dateModified).getTime() <= today.getTime() && new Date(customer.dateModified).getTime() >= sevenDaysAgo.getTime()) {
            return arr.concat(customer)
          } else {
            return arr
          }
      } else if (filterSetting === '30 Days') {
          if(new Date(customer.dateModified).getTime() <= today.getTime() && new Date(customer.dateModified).getTime() >= thirtyDaysAgo.getTime()) {
            return arr.concat(customer)
          } else {
            return arr
          }
      }
    }, [])
    setRecentCustomers(recentCustomers)
    return recentCustomers
  }

  const calculateRecentEstimates = (filterSetting) => {
    const recentEstimates = estimates.reduce((arr, estimate) => {
      const today = new Date()
      const oneDayAgo = new Date(today.getTime() - (24 * 60 * 60 * 1000))
      const sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000))
      const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000))
      if(filterSetting === '1 Day') {
          if(new Date(estimate.dateModified).getTime() <= today.getTime() && new Date(estimate.dateModified).getTime() >= oneDayAgo.getTime()) {
            return arr.concat(estimate)
          } else {
            return arr
          }
      } else if (filterSetting === '7 Days') {
          if(new Date(estimate.dateModified).getTime() <= today.getTime() && new Date(estimate.dateModified).getTime() >= sevenDaysAgo.getTime()) {
            return arr.concat(estimate)
          } else {
            return arr
          }
      } else if (filterSetting === '30 Days') {
          if(new Date(estimate.dateModified).getTime() <= today.getTime() && new Date(estimate.dateModified).getTime() >= thirtyDaysAgo.getTime()) {
            return arr.concat(estimate)
          } else {
            return arr
          }
      }
    }, [])
    setRecentEstimates(recentEstimates)
    return recentEstimates
  }

  return (
    <div className='dashboard'>
      <button className='dashboard-sidebar-button' onClick={changeNavVis} data-vis={navVis}><FaBars /></button>
      <div className='dashboard-sidebar' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='dashboard-content'>
        <Statistics 
            recentCustomers={recentCustomers}
            recentEstimates={recentEstimates}/>
        <RecentCustomers 
            calculateRecentCustomers={calculateRecentCustomers}
            recentCustomers={recentCustomers}/>
        <RecentEstimates 
            calculateRecentEstimates={calculateRecentEstimates}
            recentEstimates={recentEstimates}/>
      </div>
    </div>
  )
}

export default Dashboard