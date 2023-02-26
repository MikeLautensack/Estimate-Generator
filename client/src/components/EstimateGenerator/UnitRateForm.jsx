import React from 'react'
import './UnitRateForm.css'

const UnitRateForm = () => {
  return (
    <form className='unit-rate-form'>
        <h1>Square Foot</h1>
        <div className='unit-rate-form-fields'>
            <label>Price Per Square Foot:</label>
            <input></input>
        </div>
        <div className='unit-rate-form-fields'>
            <label>Square Feet:</label>
            <input></input>
        </div>
        <h2>$0.00</h2>
    </form>
  )
}

export default UnitRateForm