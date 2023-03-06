import React from 'react'
import './css/CustomRateForm.css'
import { useFormContext } from 'react-hook-form'

const CustomRateForm = () => {

  const { register } = useFormContext()

  return (
    <div className='custom-rate-form'>
        <h1>Custom</h1>
        <div className='custom-rate-form-fields'>
            <label>Subtask total:</label>
            <input {...register('price')}></input>
        </div>
        <h2>$0.00</h2>
    </div>
  )
}

export default CustomRateForm