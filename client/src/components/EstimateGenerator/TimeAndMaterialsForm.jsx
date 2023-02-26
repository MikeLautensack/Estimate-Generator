import React from 'react'
import './TimeAndMaterialsForm.css'

const TimeAndMaterialsForm = () => {
  return (
    <form className='time-and-materials-form'>
        <div className='time'>
            <h1>Time</h1>
            <div className='time-and-materials-input-fields'>
                <label>Unit:</label>
                <select>
                    <option>Hour</option>
                    <option>Day</option>
                </select>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Quantity:</label>
                <input></input>
            </div>
            <h2>$0.00</h2>
        </div>
        <div className='materials'>
            <h1>Materials</h1>
            <div className='time-and-materials-input-fields'>
                <label>Unit:</label>
                <select>
                    <option>Sqft</option>
                    <option>Lnft</option>
                    <option>Piece</option>
                </select>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Quantity:</label>
                <input></input>
            </div>
            <div className='time-and-materials-input-fields'>
                <label>Price Per Unit:</label>
                <input></input>
            </div>
            <h2>$0.00</h2>
        </div>
    </form>
  )
}

export default TimeAndMaterialsForm