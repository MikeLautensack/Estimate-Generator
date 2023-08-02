import React, { useEffect, useState, useContext } from 'react'
import './css/SubTask.css'
import { EstimateContext } from './EstimateForm'
import { FaTrashAlt, FaEdit } from "react-icons/fa"

const SubTask = ({ subtask, 
                   setEditSubtaskData,
                   setSubtaskFormRendered,
                   calculate }) => {

  const estimateContext = useContext(EstimateContext)
  const { dispatch } = estimateContext

  const deleteSubtask = (subtask_id, subtasksTask_id) => {
    dispatch({ type: 'deleteSubtask', payload: {subtask_id: subtask_id, subtasksTask_id: subtasksTask_id}})
    calculate(subtask, subtask.total, subtasksTask_id, 'delete')
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
                <FaEdit className='edit-subtask-button' onClick={() => editSubtask(subtask)}/>
                <FaTrashAlt onClick={() => deleteSubtask(subtask.subtask_id, subtask.task_id)} style={{color: '#B91C1C', fontSize: '1.2rem'}}/>
            </div>
        </div>
        <p className='subtask-description'>{subtask.subtaskDescription}</p>
        <h2 className='subtask-price-heading'>{`$${subtask.total ? subtask.total.toFixed(2) : 0.00}`}</h2>
    </div>
  )
}

export default SubTask