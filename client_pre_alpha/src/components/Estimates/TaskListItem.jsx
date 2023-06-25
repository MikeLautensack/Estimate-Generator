import React from 'react'
import './css/TaskListItem.css'
import SubtaskListItem from './SubtaskListItem'

const TaskListItem = ({ task }) => {
  return (
    <div className='task-list-item'>
        <h1 className='task-list-item-taskname'>{task.taskName}</h1>
        <h3 className='task-list-item-heading'>{task.taskDescription}</h3>
        <ul className='list-of-subtasks'>
            {task.subtasks.map((subtask) => (
                <li key={subtask.subtask_id}>
                    <SubtaskListItem subtask={subtask}/>
                </li>
            ))}
        </ul>
        <h2 className='task-list-item-total'>{task.total ? `$${task.total.toFixed(2)}` : '$0.00'}</h2>
    </div>
  )
}

export default TaskListItem