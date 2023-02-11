import React from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import '../css/EstimateGenerator/EstimateGenerator.css'

const EstimateGenerator = () => {
  const [navVis, setNavVis] = useState(false)
  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }
  return (
    <div className='estimate-generator'>
      <button className='estimate-generator-nav-button' onClick={changeNavVis}><FaBars /></button>
      <div className='estimate-generator-nav' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='estimate-generator-content'>
    
      </div>
    </div>
  )
}

export default EstimateGenerator