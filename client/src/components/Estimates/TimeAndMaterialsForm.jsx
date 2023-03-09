import React from 'react'
import { useFormContext, useController } from 'react-hook-form'
import './css/TimeAndMaterialsForm.css'
import { useState, useEffect } from 'react'

const TimeAndMaterialsForm = ({ editSubtaskData }) => {

    const { register, control, setValue } = useFormContext()
    const { field: timeUnit } = useController({ name: 'timeUnit', control})
    const { field: materialsUnit } = useController({ name: 'materialsUnit', control})
    const [subtaskData, setSubtaskData] = useState()

    useEffect(() => {
        if (editSubtaskData != null || undefined) {
            setValue("timeQuantity", editSubtaskData.timeQuantity)
            setValue("timePricePerUnit", editSubtaskData.timePricePerUnit)
            setValue("materialsQuantity", editSubtaskData.materialsQuantity)
            setValue("materialsPricePerUnit", editSubtaskData.materialsPricePerUnit)
            setValue("timeUnit", editSubtaskData.timeUnit)
            setValue("materialsUnit", editSubtaskData.materialsUnit)
        }
    })

    useEffect(() => {
        setSubtaskData(editSubtaskData)
    }, [editSubtaskData])

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
                <input {...register('timeQuantity')}></input>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Price Per Unit:</label>
                <input {...register('timePricePerUnit')}></input>
            </div>
            <h2>$0.00</h2>
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
                <input {...register('materialsQuantity')}></input>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Price Per Unit:</label>
                <input {...register('materialsPricePerUnit')}></input>
            </div>
            <h2>$0.00</h2>
        </div>
    </div>
  )
}

export default TimeAndMaterialsForm