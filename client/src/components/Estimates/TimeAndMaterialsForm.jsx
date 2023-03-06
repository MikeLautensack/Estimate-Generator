import React from 'react'
import { useFormContext, useController } from 'react-hook-form'
import './css/TimeAndMaterialsForm.css'

const TimeAndMaterialsForm = () => {

    const { register, control } = useFormContext()
    const { field: timeUnit } = useController({ name: 'timeUnit', control})
    const { field: materialsUnit } = useController({ name: 'materialsUnit', control})


  return (
    <div className='time-and-materials-form'>
        <div className='time'>
            <h1>Time</h1>
            <div className='time-and-materials-input-fields'>
                <label>Unit:</label>
                <select {...timeUnit}>
                    <option>Hour</option>
                    <option>Day</option>
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
                    <option>Sqft</option>
                    <option>Lnft</option>
                    <option>Piece</option>
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