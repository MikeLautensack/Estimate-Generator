import React from 'react'
import './css/SubtaskListItem.css'

const SubtaskListItem = ({ subtask }) => {
  return (
    <div>
        <h1>{subtask.subtaskName}</h1>
        <h2>{subtask.subtaskDescription}</h2>
        <h3>{subtask.total ? `$${subtask.total}` : '$0.00'}</h3>
    </div>
  )
}

export default SubtaskListItem