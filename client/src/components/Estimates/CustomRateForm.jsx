import React from 'react'
import './css/CustomRateForm.css'
import { useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react'

const CustomRateForm = ({ editSubtaskData }) => {

  const [ total, setTotal ] = useState(0.00)
  const { register, setValue } = useFormContext()

  useEffect(() => {
    if (editSubtaskData != null || undefined) {
      const { customSubtotal } = editSubtaskData
      setValue("customSubtotal", customSubtotal)
      setTotal(customSubtotal)
    }
  }, [])

  return (
    <div className='custom-rate-form'>
        <h1>Custom</h1>
        <div className='custom-rate-form-fields'>
            <label>Subtask total:</label>
            <input type='number' {...register('customSubtotal', {
              onChange: (e) => {
                setTotal(e.target.value)
              },
              valueAsNumber: true
            })}></input>
        </div>
        <h2>{`$${total ? Number(total).toFixed(2) : '0.00'}`}</h2>
    </div>
  )
}

export default CustomRateForm