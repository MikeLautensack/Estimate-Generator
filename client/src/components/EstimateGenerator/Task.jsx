import React from 'react'
import '../css/EstimateGenerator/Task.css'
import SubTask from './SubTask'

const Task = () => {
  return (
    <div className='task'>
        <div className='task-name-and-price'>
            <h2 className='task-name'>Task Name</h2>
            <label className='task-price-label'></label><input className='task-price'></input>
        </div>
        <textarea className='task-description'>

        </textarea>
        <div className='subtask-list'>
            <SubTask />
            <SubTask />
        </div>
        <div className='subtask-buttons'>
            <button className='add-subtask-button'>Add Sub-Task</button>
            <button className='delete-task-button'>Delete Task</button>
        </div>
    </div>
  )
}

export default Task