import React from 'react'
import './CustomRateForm.css'

const CustomRateForm = () => {
  return (
    <form className='custom-rate-form'>
        <h1>Custom</h1>
        <div className='custom-rate-form-fields'>
            <label>Price:</label>
            <input></input>
        </div>
        <h2>$0.00</h2>
    </form>
  )
}

export default CustomRateForm