import React from 'react'
import './css/SubtaskListItem.css'

const SubtaskListItem = ({ subtask }) => {
  return (
    <div className='subtask-list-item'>
        <h1 className='subtask-list-item-subtaskname'>{subtask.subtaskName}</h1>
        <h2 className='subtask-list-item-heading'>{subtask.subtaskDescription}</h2>
        <h3 className='subtask-list-item-total'>{subtask.total ? `$${subtask.total.toFixed(2)}` : '$0.00'}</h3>
    </div>
  )
}

export default SubtaskListItem