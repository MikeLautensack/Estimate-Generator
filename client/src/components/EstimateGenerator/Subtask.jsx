import React from 'react'
import '../css/EstimateGenerator/SubTask.css'

const SubTask = () => {
  return (
    <div className='subtask'>
        <div className='subtask-buttons'>
            <button className='edit-subtask-button'>Edit</button>
            <button className='delete-subtask-button'>Delete</button>
        </div>
        <div className='subtask-fields'>
            <h2 className='subtask-name-heading'>SubTask Name:</h2>
            <h2 className='subtask-price-heading'>$0.00</h2>
        </div>
    </div>
  )
}

export default SubTask