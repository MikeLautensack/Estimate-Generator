import React from 'react'
import './css/UnitRateForm.css'
import { useState, useEffect } from 'react'
import { useFormContext, useController } from 'react-hook-form'

const UnitRateForm = ({ editSubtaskData }) => {
  const { register, control, setValue } = useFormContext()
  const { field:unitRate } = useController({ name: 'unit', control})
  const [subtaskData, setSubtaskData] = useState()
  useEffect(() => {
    if (editSubtaskData != null || undefined) {
      setValue("pricePerUnit", editSubtaskData.pricePerUnit)
      setValue("quantity", editSubtaskData.quantity)
      setValue("unit", editSubtaskData.unit)
  }
  }, [])

  useEffect(() => {
    setSubtaskData(editSubtaskData)
  }, [editSubtaskData])
  
  

  return (
    <div className='unit-rate-form'>
        <h1>Unit Rate</h1>
        <div className='time-and-materials-input-fields'>
            <label>Unit:</label>
            <select {...unitRate}>
                <option value='sqft'>Sqft</option>
                <option value='lnft'>Lnft</option>
                <option value='piece'>Piece</option>
            </select>
        </div>
        <div className='unit-rate-form-fields'>
            <label>Price Per Unit:</label>
            <input {...register('pricePerUnit')}></input>
        </div>
        <div className='unit-rate-form-fields'>
            <label>Quantity:</label>
            <input {...register('quantity')}></input>
        </div>
        <h2>$0.00</h2>
    </div>
  )
}

export default UnitRateForm