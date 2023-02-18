import React from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import '../css/Customers/Customers.css'
import CustomerContent from './CustomerContent'

const Customers = () => {
  const [navVis, setNavVis] = useState(false)
  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }
  return (
    <div className='customers'>
      <button className='customers-nav-button' onClick={changeNavVis}><FaBars /></button>
      <div className='customers-nav' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='customers-content'>
        <CustomerContent />
      </div>
    </div>
  )
}

export default Customers