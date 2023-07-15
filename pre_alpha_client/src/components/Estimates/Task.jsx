import React, { useEffect } from 'react'
import './css/Task.css'
import SubTask from './SubTask'
import { useState, useContext } from 'react'
import { EstimateContext } from './EstimateForm'
import { FaTrashAlt } from "react-icons/fa"

const Task = ({ setSubtaskFormRendered,
                setEditSubtaskData,
                setTaskFormRendered,
                setTask_id,
                setEditTaskData,
                task,
                calculate,
                calculateOnDeleteTask }) => {

    const [subtasks, setSubtasks] = useState([])
    const estimateContext = useContext(EstimateContext)
    const { dispatch } = estimateContext

    useEffect(() => {
      setSubtasks(task.subtasks)
    }, [task.subtasks])

    const deleteTask = () => {
      dispatch({ type: 'deleteTask', payload: { taskID: task.task_id}})
      calculateOnDeleteTask(task)
    }

  return (
    <div className='task'>
        <div className='task-name-and-delete-icon'>
            <h2 className='task-name'>{task.taskName}</h2>
            <FaTrashAlt onClick={() => deleteTask()} style={{color: '#B91C1C'}}/>
        </div>
        <p className='task-description'>{task.taskDescription}</p>
        <ul className='subtask-list'>
            {subtasks.map((subtask) => (
              <li key={subtask.subtask_id}>
                <SubTask 
                  subtask={subtask}
                  setTask_id={setTask_id}
                  task={task}
                  setEditSubtaskData={setEditSubtaskData}
                  setSubtaskFormRendered={setSubtaskFormRendered}
                  calculate={calculate}/>
              </li>
            ))}
        </ul>
        <div className='tasks-subtask-buttons'>
            <button onClick={() => (setTask_id(task.task_id), setSubtaskFormRendered(true))} className='add-subtask-button'>Add Subtask</button>
            <button onClick={() => (setTaskFormRendered(true), setEditTaskData(task))} className='edit-task-button'>Edit Task</button>
        </div>
        <div>
            <h3 className='est-form-task-total'>{`$${task.total ? task.total.toFixed(2) : '0.00'}`}</h3>
        </div>
    </div>
  )
}

export default Task