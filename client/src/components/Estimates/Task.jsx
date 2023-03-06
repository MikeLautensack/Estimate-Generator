import React, { useEffect } from 'react'
import './css/Task.css'
import SubTask from './SubTask'
import { useState } from 'react'

const Task = ({ setSubtaskFormRendered,
                setTaskID,
                deleteTask,
                task }) => {

    const [subtasks, setSubtasks] = useState([])

    useEffect(() => {
      setSubtasks(task.subtasks)
    }, [task.subtasks])

  return (
    <div className='task'>
        <div className='task-name-and-price'>
            <h2 className='task-name'>{task.taskName}</h2>
            <h3 className='task-price'>{task.taskDescription}</h3>
        </div>
        <p className='task-description' rows="2">

        </p>
        <ul className='subtask-list'>
            {subtasks.map((subtask) => (
              <li key={subtask.id}>
                <SubTask subtask={subtask}/>
              </li>
            ))}
        </ul>
        <div className='tasks-subtask-buttons'>
            <button onClick={() => (setTaskID(task.id), setSubtaskFormRendered(true))} className='add-subtask-button'>Add Sub-Task</button>
            <button onClick={() => deleteTask(task.id)} className='delete-task-button'>Delete Task</button>
        </div>
    </div>
  )
}

export default Task