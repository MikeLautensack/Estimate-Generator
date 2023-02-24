import React from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './Estimates.css'
import Estimate from './Estimate'
import NewEstimateForm from '../EstimateGenerator/NewEstimateForm'


const Estimates = () => {

  const [estimateGeneratorFormRendered, setEstimateGeneratorFormRendered] = useState(false)
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
      <button className='estimates-sidebar-button' onClick={changeNavVis}><FaBars /></button>
      <div className='estimates-sidebar' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='estimates-content'>
        <div className='estimates-content-top'>
          <h1 className='estimate-heading'>Estimates</h1>
          <button onClick={() => setEstimateGeneratorFormRendered(true)} className='new-estimate-button'>New Estimate</button>
        </div>
        <div className='estimates-card'>
            <div className='estimate-list'>
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
                <Estimate />
            </div>
        </div>
        {estimateGeneratorFormRendered === true && <NewEstimateForm 
            setEstimateGeneratorFormRendered={setEstimateGeneratorFormRendered}/>}
      </div>
    </div>
  )
}

export default Estimates