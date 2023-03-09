import React from 'react'
import './css/CustomRateForm.css'
import { useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react'

const CustomRateForm = ({ editSubtaskData }) => {

  const [subtaskData, setSubtaskData] = useState()
  const { register, setValue } = useFormContext()

  useEffect(() => {
    setSubtaskData(editSubtaskData)
  }, [editSubtaskData])
  
  if (subtaskData != null || undefined) {
      const { customSubtotal } = subtaskData
      setValue("customSubtotal", customSubtotal)
  }

  return (
    <div className='custom-rate-form'>
        <h1>Custom</h1>
        <div className='custom-rate-form-fields'>
            <label>Subtask total:</label>
            <input {...register('customSubtotal')}></input>
        </div>
        <h2>$0.00</h2>
    </div>
  )
}

export default CustomRateForm