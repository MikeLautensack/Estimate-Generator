import React, { useEffect, useState } from 'react'
import './css/SubTask.css'

const SubTask = ({ subtask }) => {

  const [subtaskData, setSubtaskData] = useState({})

  useEffect(() => {
    setSubtaskData(subtask)
  }, [subtask])

  return (
    <div className='subtask'>
        <div className='subtask-buttons'>
            <button className='edit-subtask-button'>Edit</button>
            <button className='delete-subtask-button'>Delete</button>
        </div>
        <div className='subtask-fields'>
            <h2 className='subtask-name-heading'>{subtaskData.subtaskName}</h2>
            <h2 className='subtask-price-heading'>{subtaskData.subtaskTotal}</h2>
        </div>
    </div>
  )
}

export default SubTask