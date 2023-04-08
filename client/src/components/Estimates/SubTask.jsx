import React, { useEffect, useState, useContext } from 'react'
import './css/SubTask.css'
import { EstimateContext } from './EstimateForm'
import { FaTrashAlt } from "react-icons/fa"

const SubTask = ({ subtask, 
                   setEditSubtaskData,
                   setSubtaskFormRendered,
                   calculate }) => {

  const estimateContext = useContext(EstimateContext)
  const { dispatch } = estimateContext

  const deleteSubtask = (subtaskID, subtasksTaskID) => {
    dispatch({ type: 'deleteSubtask', payload: {subtaskID: subtaskID, subtasksTaskID: subtasksTaskID}})
    calculate(subtask, subtask.total, subtasksTaskID, 'delete')
  }

  const editSubtask = (subtask) => {
    setSubtaskFormRendered(true)
    setEditSubtaskData(subtask)
  }

  return (
    <div className='subtask'>
        <div className='subtask-name-and-delete-button'>
            <h2 className='subtask-name-heading'>{subtask.subtaskName}</h2>
            <div className='subtask-button-box'>
                <button className='edit-subtask-button' onClick={() => editSubtask(subtask)}>Edit</button>
                <FaTrashAlt onClick={() => deleteSubtask(subtask.id, subtask.taskID)} style={{color: '#B91C1C', fontSize: '1.3rem'}}/>
            </div>
        </div>
        <p className='subtask-description'>{subtask.subtaskDescription}</p>
        <h2 className='subtask-price-heading'>{`$${subtask.total ? subtask.total.toFixed(2) : 0.00}`}</h2>
    </div>
  )
}

export default SubTask