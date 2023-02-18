import React from 'react'
import Estimate from '../Estimate'
import '../css/Estimates/EstimateContent.css'

const EstimateContent = () => {
  return (
    <div className='estimate-content-component'>
        <div className='estimate-content-component-top'>
          <h1 className='estimate-heading'>Estimates</h1>
          <button className='new-estimate-button'>New Estimate</button>
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
    </div>
  )
}

export default EstimateContent