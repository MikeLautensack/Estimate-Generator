import React, { useReducer, useState, createContext, useEffect } from 'react'
import './css/EstimateForm.css'
import Task from './Task'
import { FaTimes } from 'react-icons/fa'
import TaskForm from './TaskForm'
import SubtaskForm from './SubtaskForm'
import { useForm } from 'react-hook-form'

const reducer = (estimate, action) => {
    switch(action.type) {
        case 'loadEstimate':
            return action.payload
        case 'addTask':
            return {
                ...estimate,
                tasks: [...estimate.tasks, action.payload]
            }
        case 'editTask':
            return {
                ...estimate,
                tasks: estimate.tasks.map((task) => {
                    if(task.id === action.payload.id) {
                        return action.payload
                    } else {
                        return task
                    }
                })
            }
        case 'deleteTask':
            return {
                ...estimate,
                tasks: estimate.tasks.filter((task) => task.id !== action.payload.taskID)
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
        case 'editSubtask':
            return {
                ...estimate,
                tasks: estimate.tasks.map((task) => {
                    if(task.id === action.payload.taskID) {
                        return {
                            ...task,
                            subtasks: task.subtasks.map((subtask) => {
                                if(subtask.id === action.payload.id) {
                                    return action.payload
                                } else {
                                    return subtask
                                }
                            })
                        }
                    } else {
                        return {
                            ...task,
                            subtasks: task.subtasks
                        }
                    }
                })
            }
        case 'deleteSubtask':
            return {
                ...estimate,
                tasks: estimate.tasks.map((task) => {
                    if(task.id === action.payload.subtasksTaskID) {
                        return {
                            ...task,
                            subtasks: task.subtasks.filter((subtask) => subtask.id !== action.payload.subtaskID)
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
                        add,
                        edit,
                        editEstimateData,
                        setEditEstimateData}) => {

    const [editTaskData, setEditTaskData] = useState()
    const [editSubtaskData, setEditSubtaskData] = useState()
    const [taskFormRendered, setTaskFormRendered] = useState(false)
    const [subtaskFormRendered, setSubtaskFormRendered] = useState(false)
    const [taskID, setTaskID] = useState(0)
    const { register, handleSubmit, setValue } = useForm()
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

    useEffect(() => {
        if(editEstimateData != null || undefined) {
            dispatch({ type: 'loadEstimate', payload: editEstimateData})
            setValue("estimateName", editEstimateData.estimateName)
            setValue("customerName", editEstimateData.customerName)
            setValue("customerEmail", editEstimateData.customerEmail)
            setValue("customerPhone", editEstimateData.customerPhone)
            setValue("address", editEstimateData.address)
            setValue("estimateNumber", editEstimateData.estimateNumber)
        }
    }, [])

    const addEst = (data) => {
        const newEstimate = {
            ...estimate,
            estimateName: data.estimateName,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            address: data.address,
            id: data.estimateNumber
        }
        add(newEstimate)
        setEstimateFormRendered(false)
    }

    const editEst = (data) => {
        const newEstimate = {
            ...editEstimateData,
            estimateName: data.estimateName,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            address: data.address,
            tasks: estimate.tasks
        }
        edit(newEstimate)
        setEditEstimateData(null)
        setEstimateFormRendered(false)
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
                                    setSubtaskFormRendered={setSubtaskFormRendered}
                                    setEditSubtaskData={setEditSubtaskData}
                                    setTaskFormRendered={setTaskFormRendered}
                                    setEditTaskData={setEditTaskData}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='buttons-and-price'>
                    <button className='estimate-buttons'>Preview Estimate</button>
                    <button onClick={handleSubmit(editEstimateData == null || undefined ? addEst : editEst)} className='estimate-buttons'>Save</button>
                    <button className='estimate-buttons'>Save & Send</button>
                    <h1 className='estimate-total'>$0.00</h1>
                </div>
            </div>
            {taskFormRendered === true && <TaskForm 
                setTaskFormRendered={setTaskFormRendered}
                editTaskData={editTaskData}
                setEditTaskData={setEditTaskData}/>}
            {subtaskFormRendered === true && <SubtaskForm 
                setSubtaskFormRendered={setSubtaskFormRendered}
                taskID={taskID}
                editSubtaskData={editSubtaskData}
                setEditSubtaskData={setEditSubtaskData}/>}
        </div>
    </EstimateContext.Provider>
  )
}

export default EstimateForm