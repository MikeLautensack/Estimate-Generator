import React from 'react'
import '../css/EstimateGenerator/SubTask.css'

const SubTask = () => {
  return (
    <div className='subtask'>
        <button className='edit-subtask-button'>Edit</button>
        <button className='delete-subtask-button'>Delete</button>
        <label>SubTask Name:</label>
        <input></input>
    </div>
  )
}

export default SubTask