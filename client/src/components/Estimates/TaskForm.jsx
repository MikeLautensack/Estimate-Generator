import React, { useContext, useEffect, useState } from 'react'
import './css/TaskForm.css'
import { FaTimes } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { EstimateContext } from './EstimateForm'

const NewTaskForm = ({ setTaskFormRendered, 
                       editTaskData,
                       setEditTaskData}) => {
    
    const estimateContext = useContext(EstimateContext)
    const { dispatch } = estimateContext
    const { register, handleSubmit, setValue } = useForm()
    const [task, setTask] = useState( 
    {
        id: 0,
        taskName: "",
        taskTotal: 0.0,
        taskDescription: "",
        subtasks: []
    })

    useEffect(() => {
        if (editTaskData != null || undefined) {
            setValue("taskName", editTaskData.taskName)
            setValue("taskDescription", editTaskData.taskDescription)
        }
    }, [])

    const createNewTask = (data) => {
        const newTask = {
            ...task,
            taskName: data.taskName,
            taskDescription: data.taskDescription,
            id: generateID()
        }
        dispatch({ type: 'addTask', payload: newTask})
        setTaskFormRendered(false)
    }

    const editTask = (data) => {
        const newTask = {
            ...editTaskData,
            taskName: data.taskName,
            taskDescription: data.taskDescription,
        }
        dispatch({ type: 'editTask', payload: newTask})
        setTaskFormRendered(false)
        setEditTaskData(null)
    }

    const generateID = () => {
        return Math.random()
    }

  return (
    <form onSubmit={handleSubmit(editTaskData == null || undefined ? createNewTask : editTask)} className='new-task-form'>
        <FaTimes 
            onClick={() => setTaskFormRendered(false)}
            style={{ color: 'white', 
                         position: 'absolute',
                         top: '.5rem',
                         left: '.5rem'}}/>
        <div className='new-task-input-feilds-box'>
            <div className='new-task-input-feilds'>
                <label>Task Name:</label>
                <input {...register("taskName")} placeholder='First Name:'></input>
            </div>
            <div className='new-task-input-feilds'>
                <label>Task Description:</label>
                <input {...register("taskDescription")} placeholder='Last Name:'></input>
            </div>
        </div>
        <button className='new-task-form-submit-button'>{editTaskData != null || undefined ? "Edit Task" : "Create New Task"}</button>
    </form>
  )
}

export default NewTaskForm