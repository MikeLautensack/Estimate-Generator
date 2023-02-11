import React from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import '../css/Estimates/Estimates.css'


const Estimates = () => {
  const [navVis, setNavVis] = useState(false)
  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }
  return (
    <div className='estimates'>
      <button className='estimates-nav-button' onClick={changeNavVis}><FaBars /></button>
      <div className='estimates-nav' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='estimates-content'>
    
      </div>
    </div>
  )
}

export default Estimates