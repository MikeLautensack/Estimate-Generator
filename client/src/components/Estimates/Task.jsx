import React, { useEffect } from 'react'
import './css/Task.css'
import SubTask from './SubTask'
import { useState, useContext } from 'react'
import { EstimateContext } from './EstimateForm'

const Task = ({ setSubtaskFormRendered,
                setEditSubtaskData,
                setTaskFormRendered,
                setTaskID,
                setEditTaskData,
                task }) => {

    const [subtasks, setSubtasks] = useState([])
    const estimateContext = useContext(EstimateContext)
    const { dispatch } = estimateContext

    useEffect(() => {
      setSubtasks(task.subtasks)
    }, [task.subtasks])

    const deleteTask = () => {
      dispatch({ type: 'deleteTask', payload: { taskID: task.id}})
    }

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
                <SubTask 
                  subtask={subtask}
                  setTaskID={setTaskID}
                  task={task}
                  setEditSubtaskData={setEditSubtaskData}
                  setSubtaskFormRendered={setSubtaskFormRendered}/>
              </li>
            ))}
        </ul>
        <div className='tasks-subtask-buttons'>
            <button onClick={() => (setTaskID(task.id), setSubtaskFormRendered(true))} className='add-subtask-button'>Add Sub-Task</button>
            <button onClick={() => deleteTask()} className='delete-task-button'>Delete Task</button>
            <button onClick={() => (setTaskFormRendered(true), setEditTaskData(task))} className='edit-task-button'>Edit Task</button>
        </div>
    </div>
  )
}

export default Task