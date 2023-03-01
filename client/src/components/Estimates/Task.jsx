import React from 'react'
import './css/Task.css'
import SubTask from './SubTask'

const Task = ({ setNewSubtaskFormRendered }) => {
  return (
    <div className='task'>
        <div className='task-name-and-price'>
            <h2 className='task-name'>Task Name</h2>
            <h3 className='task-price'>$0.00</h3>
        </div>
        <textarea className='task-description' rows="2">

        </textarea>
        <div className='subtask-list'>
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
            <SubTask />
        </div>
        <div className='tasks-subtask-buttons'>
            <button onClick={() => setNewSubtaskFormRendered(true)} className='add-subtask-button'>Add Sub-Task</button>
            <button className='delete-task-button'>Delete Task</button>
        </div>
    </div>
  )
}

export default Task