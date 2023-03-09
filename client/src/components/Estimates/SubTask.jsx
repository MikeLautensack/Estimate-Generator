import React, { useEffect, useState, useContext } from 'react'
import './css/SubTask.css'
import { EstimateContext } from './EstimateForm'

const SubTask = ({ subtask, 
                   setEditSubtaskData,
                   setSubtaskFormRendered }) => {

  const estimateContext = useContext(EstimateContext)
  const { dispatch } = estimateContext

  const deleteSubtask = (subtaskID, subtasksTaskID) => {
    dispatch({ type: 'deleteSubtask', payload: {subtaskID: subtaskID, subtasksTaskID: subtasksTaskID}})
    console.log('test')
  }

  const editSubtask = (subtask) => {
    setSubtaskFormRendered(true)
    setEditSubtaskData(subtask)
  }

  return (
    <div className='subtask'>
        <div className='subtask-buttons'>
            <button onClick={() => editSubtask(subtask)} className='edit-subtask-button'>Edit</button>
            <button onClick={() => deleteSubtask(subtask.id, subtask.taskID)} className='delete-subtask-button'>Delete</button>
        </div>
        <div className='subtask-fields'>
            <h2 className='subtask-name-heading'>{subtask.subtaskName}</h2>
            <h2 className='subtask-price-heading'>{subtask.total}</h2>
        </div>
    </div>
  )
}

export default SubTask