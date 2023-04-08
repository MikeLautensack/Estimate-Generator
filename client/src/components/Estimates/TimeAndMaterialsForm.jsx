import React from 'react'
import { useFormContext, useController } from 'react-hook-form'
import './css/TimeAndMaterialsForm.css'
import { useState, useEffect } from 'react'


const TimeAndMaterialsForm = ({ editSubtaskData }) => {

    const { register, control, setValue } = useFormContext()
    const { field: timeUnit } = useController({ name: 'timeUnit', control})
    const { field: materialsUnit } = useController({ name: 'materialsUnit', control})
    const [ timeQuantity, setTimeQuantity ] =  useState()
    const [ timePricePerUnit, setTimePricePerUnit ] =  useState()
    const [ timeTotal, setTimeTotal ] =  useState()
    const [ materialsQuantity, setMaterialsQuantity ] =  useState()
    const [ materialsPricePerUnit, setMaterialsPricePerUnit ] =  useState()
    const [ materialsTotal, setMaterialsTotal ] =  useState()

    useEffect(() => {
        if (editSubtaskData != null || undefined) {
            setValue("timeQuantity", editSubtaskData.timeQuantity)
            setTimeQuantity(editSubtaskData.timeQuantity)
            setValue("timePricePerUnit", editSubtaskData.timePricePerUnit)
            setTimePricePerUnit(editSubtaskData.timePricePerUnit)
            setValue("materialsQuantity", editSubtaskData.materialsQuantity)
            setMaterialsQuantity(editSubtaskData.materialsQuantity)
            setValue("materialsPricePerUnit", editSubtaskData.materialsPricePerUnit)
            setMaterialsPricePerUnit(editSubtaskData.materialsPricePerUnit)
            setValue("timeUnit", editSubtaskData.timeUnit)
            setValue("materialsUnit", editSubtaskData.materialsUnit)
        }
    }, [])

    useEffect(() => {
        setTimeTotal(clacTimeTotal())
    }, [timePricePerUnit, timeQuantity])

      useEffect(() => {
        setMaterialsTotal(clacMaterialTotal())
    }, [materialsPricePerUnit, materialsQuantity])

    const clacTimeTotal = () => {
        return timeQuantity * timePricePerUnit
    }

    const clacMaterialTotal = () => {
        return materialsQuantity * materialsPricePerUnit
    }

  return (
    <div className='time-and-materials-form'>
        <div className='time'>
            <h1>Time</h1>
            <div className='time-and-materials-input-fields'>
                <label>Unit:</label>
                <select {...timeUnit}>
                    <option value='hour'>Hour</option>
                    <option value='day'>Day</option>
                </select>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Quantity:</label>
                <input type='number' {...register('timeQuantity', {
              onChange: (e) => {
                setTimeQuantity(e.target.value)
              },
              valueAsNumber: true
            })}></input>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Price Per Unit:</label>
                <input type='number' {...register('timePricePerUnit', {
              onChange: (e) => {
                setTimePricePerUnit(e.target.value)
              },
              valueAsNumber: true
            })}></input>
            </div>
            <h2>{timeTotal ? `$${timeTotal.toFixed(2)}` : '$0.00'}</h2>
        </div>
        <div className='materials'>
            <h1>Materials</h1>
            <div className='time-and-materials-input-fields'>
                <label>Unit:</label>
                <select {...materialsUnit}>
                    <option value='sqft'>Sqft</option>
                    <option value='lnft'>Lnft</option>
                    <option value='piece'>Piece</option>
                </select>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Quantity:</label>
                <input type='number' {...register('materialsQuantity', {
              onChange: (e) => {
                setMaterialsQuantity(e.target.value)
              },
              valueAsNumber: true
            })}></input>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Price Per Unit:</label>
                <input type='number' {...register('materialsPricePerUnit', {
              onChange: (e) => {
                setMaterialsPricePerUnit(e.target.value)
              },
              valueAsNumber: true
            })}></input>
            </div>
            <h2>{materialsTotal ? `$${materialsTotal.toFixed(2)}` : '$0.00'}</h2>
        </div>
    </div>
  )
}

export default TimeAndMaterialsForm