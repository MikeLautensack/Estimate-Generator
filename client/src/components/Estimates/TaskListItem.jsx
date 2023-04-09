import React from 'react'
import './css/TaskListItem.css'
import SubtaskListItem from './SubtaskListItem'

const TaskListItem = ({ task }) => {
  return (
    <div>
        <h1>{task.taskName}</h1>
        <h3>{task.taskDescription}</h3>
        <ul>
            {task.subtasks.map((subtask) => {
                <li>
                    <SubtaskListItem subtask={subtask}/>
                </li>
            })}
        </ul>
        <h2>{task.total ? `$${task.total}` : '$0.00'}</h2>
    </div>
  )
}

export default TaskListItem