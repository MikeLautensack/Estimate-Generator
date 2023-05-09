import React from 'react'
import './css/UnitRateForm.css'
import { useState, useEffect } from 'react'
import { useFormContext, useController } from 'react-hook-form'

const UnitRateForm = ({ editSubtaskData }) => {
  const { register, control, setValue } = useFormContext()
  const { field:unitRate } = useController({ name: 'unit', control})
  const [ pricePerUnit, setPricePerUnit ] = useState() 
  const [ quantity, setQuantity ] = useState() 
  const [ total, setTotal ] = useState(0.00) 

  useEffect(() => {
    if (editSubtaskData != null || undefined) {
      setValue("pricePerUnit", editSubtaskData.pricePerUnit)
      setPricePerUnit(editSubtaskData.pricePerUnit)
      setValue("quantity", editSubtaskData.quantity)
      setQuantity(editSubtaskData.quantity)
      setValue("unit", editSubtaskData.unit)
      setTotal(calculate())
    }
  }, [])

  useEffect(() => {
    setTotal(calculate())
  }, [pricePerUnit, quantity])

  const calculate = () => {
    return pricePerUnit * quantity
  }

  return (
    <div className='unit-rate-form'>
        <h1>Unit Rate</h1>
        <div className='time-and-materials-input-fields'>
            <label>Unit:</label>
            <select className='unit-rate-select' {...unitRate}>
                <option value='sqft'>Sqft</option>
                <option value='lnft'>Lnft</option>
                <option value='piece'>Piece</option>
            </select>
        </div>
        <div className='unit-rate-form-fields'>
            <label>Price Per Unit:</label>
            <input type="number" step="any" {...register('pricePerUnit', {
              onChange: (e) => {
                setPricePerUnit(e.target.value)
              },
              valueAsNumber: true
            })}></input>
        </div>
        <div className='unit-rate-form-fields'>
            <label>Quantity:</label>
            <input type="number" step="any" {...register('quantity', {
              onChange: (e) => {
                setQuantity(e.target.value)
              },
              valueAsNumber: true
            })}></input>
        </div>
        <h2>{`$${total ? total.toFixed(2) : '0.00'}`}</h2>
    </div>
  )
}

export default UnitRateForm