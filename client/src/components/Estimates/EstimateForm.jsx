import React, { useReducer, useState, createContext, useEffect } from 'react'
import './css/EstimateForm.css'
import Task from './Task'
import { FaTimes } from 'react-icons/fa'
import TaskForm from './TaskForm'
import SubtaskForm from './SubtaskForm'
import { useForm } from 'react-hook-form'

const reducer = (estimate, action) => {
    switch(action.type) {
        case 'save':
            return {
                ...estimate, 
                estimateName: action.payload.estimateName,
                customerName: action.payload.customerName,
                customerEmail: action.payload.customerEmail,
                customerPhone: action.payload.customerPhone,
                address: action.payload.address,
                id: action.payload.estimateNumber 
            }
        case 'addTask':
            return {
                ...estimate,
                tasks: [...estimate.tasks, action.payload]
            }
        case 'editTask':
            return
        case 'deleteTask':
            return {
                ...estimate,
                tasks: action.payload
            }
        case 'addSubtask':
            return {
                ...estimate,
                tasks: estimate.tasks.map((task) => {
                    if(task.id === action.payload.taskID) {
                        return {
                            ...task,
                            subtasks: [...task.subtasks, action.payload]
                        }
                    } else {
                        return {
                            ...task,
                            subtasks: task.subtasks
                        }
                    }
                })
            }
    }
}

export const EstimateContext = createContext()

const EstimateForm = ({ setEstimateFormRendered,
                        addEstimate}) => {

    const [taskFormRendered, setTaskFormRendered] = useState(false)
    const [subtaskFormRendered, setSubtaskFormRendered] = useState(false)
    const [taskID, setTaskID] = useState(0)
    const { register, handleSubmit } = useForm()
    const [estimate, dispatch] = useReducer(reducer, 
    {
        id: 0,
        estimateName: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        address: "",
        tasks: []
    })

    const save = (data) => {
        dispatch({ type: 'save', payload: data})
        const newEstimate = {
            ...estimate,
            estimateName: data.estimateName,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            address: data.address,
            id: data.estimateNumber
        }
        addEstimate(newEstimate)
        setEstimateFormRendered(false)
    }

    const editTask = () => {

    }

    const deleteTask = (id) => {
        const list = estimate.tasks.filter((task) => task.id !== id)
        dispatch({ type: 'deleteTask', payload: list})
    }

  return (
    <EstimateContext.Provider value={{estimate, dispatch}}>
        <div className='estimate-form'>
            <div className='estimate-template'>
                <FaTimes 
                    onClick={() => setEstimateFormRendered(false)}
                    style={{ color: 'white', 
                             position: 'absolute',
                             top: '.5rem',
                             left: '.5rem'}}/>
                <form className='heading-and-inputs'>
                    <div className='estimate-name-heading'>
                        <label>Estimate Name</label>
                        <input {...register("estimateName", {required: true})}></input>
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Customer Name:</label>
                        <input {...register("customerName", {required: true})}></input>
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Customer Email:</label>
                        <input {...register("customerEmail")}></input>
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Customer Phone:</label>
                        <input {...register("customerPhone")}></input>
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Property Address:</label>
                        <input {...register("address", {required: true})}></input>
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Estimate Number:</label>
                        <input {...register("estimateNumber")}></input>
                    </div>
                </form>
                <div className='tasks'>
                    <h2 className='tasks-list-heading'>Tasks</h2>
                    <button onClick={() => setTaskFormRendered(true)} className='add-task-button'>Add Task</button>
                    <ul className='task-list'>
                        {estimate.tasks.map((task) => (
                            <li key={task.id}>
                                <Task 
                                    task={task}
                                    setTaskID={setTaskID}
                                    deleteTask={deleteTask}
                                    setSubtaskFormRendered={setSubtaskFormRendered}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='buttons-and-price'>
                    <button className='estimate-buttons'>Preview Estimate</button>
                    <button onClick={handleSubmit(save)} className='estimate-buttons'>Save</button>
                    <button className='estimate-buttons'>Save & Send</button>
                    <h1 className='estimate-total'>$0.00</h1>
                </div>
            </div>
            {taskFormRendered === true && <TaskForm 
                setTaskFormRendered={setTaskFormRendered}/>}
            {subtaskFormRendered === true && <SubtaskForm 
                setSubtaskFormRendered={setSubtaskFormRendered}
                taskID={taskID}/>}
        </div>
    </EstimateContext.Provider>
  )
}

export default EstimateForm