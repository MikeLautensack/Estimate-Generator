import React, { useReducer, useState, createContext, useEffect } from 'react'
import './css/EstimateForm.css'
import Task from './Task'
import { FaTimes } from 'react-icons/fa'
import TaskForm from './TaskForm'
import SubtaskForm from './SubtaskForm'
import { useForm } from 'react-hook-form'
import { validateEstimate } from '../../validations/validations.js'
import { yupResolver } from '@hookform/resolvers/yup'

const reducer = (estimate, action) => {
    switch(action.type) {
        case 'loadEstimate':
            return action.payload
        case 'calculateEstimate':
            return action.payload
        case 'calculateOnDeleteTask':
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
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validateEstimate)
    })
    const [estimate, dispatch] = useReducer(reducer, 
    {
        _id: 0,
        estimateName: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        address: "",
        dateCreated: {},
        dateModified: {},
        tasks: [],
        total: 0
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
            _id: Math.random(),
            estimateName: data.estimateName,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            address: data.address,
            dateCreated: new Date(),
            dateModified: new Date(),
            total: estimate.total
        }
        add(newEstimate)
        setEstimateFormRendered(false)
    }

    const editEst = (data) => {
        const updatedEstimate = {
            ...editEstimateData,
            estimateName: data.estimateName,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            address: data.address,
            dateModified: new Date(),
            tasks: estimate.tasks,
            total: estimate.total
        }
        edit(updatedEstimate)
        setEditEstimateData(null)
        setEstimateFormRendered(false)
    }

    const calculate = (object, asyncSubtaskTotalData, taskID, mode, editDataTotal, submissionDataTotal) => {
        let estTotal = 0
        const calculatedEstimate = {
          ...estimate,
          tasks: estimate.tasks.map((task) => {
            let taskTotal = 0
            task.subtasks.forEach((subtask) => {
              taskTotal += subtask.total
            })
            if(taskID == task.id) {
                if(mode == 'add') {
                    taskTotal += asyncSubtaskTotalData
                } else if (mode == 'edit') {
                    if(editDataTotal != submissionDataTotal) {
                        taskTotal += asyncSubtaskTotalData - editDataTotal
                    }
                } else if (mode == 'delete') {
                    taskTotal = taskTotal - object.total
                }
            }
            estTotal += taskTotal
            if(mode == 'add') {
                if(taskID == task.id) {
                    return {
                        ...task,
                        subtasks: task.subtasks.concat(object),
                        total: taskTotal
                    }
                } else {
                    return {
                        ...task,
                        total: taskTotal
                    }
                }
            } else if (mode == 'edit') {
                if(taskID == task.id) {
                    if(editDataTotal != submissionDataTotal) {
                        return {
                            ...task,
                            subtasks: task.subtasks.map((subtask) => {
                                if(subtask.id == object.id) {
                                    return object
                                } else {
                                    return subtask
                                }
                            }),
                            total: taskTotal
                        }
                    } else {
                        return {
                            ...task,
                            total: taskTotal
                        }
                    }
                } else {
                    return {
                        ...task,
                        total: taskTotal
                    }
                }
            } else if (mode == 'delete') {
                if(taskID == task.id) {
                    return {
                        ...task,
                        subtasks: task.subtasks.filter((subtask) => {
                            if(subtask.id != object.id) {
                                return subtask
                            }
                        }),
                        total: taskTotal
                    }
                } else {
                    return {
                        ...task,
                        total: taskTotal
                    }
                } 
            }
          }), 
          total: estTotal
        }
        console.log(calculatedEstimate)
        dispatch({ type: 'calculateEstimate', payload: calculatedEstimate })
    }

    const calculateOnDeleteTask = (taskData) => {
        let estTotal = 0
        const calculatedEstimate = {
          ...estimate,
          tasks: estimate.tasks.reduce((arr, task) => {
            let taskTotal = 0
            task.subtasks.forEach((subtask) => {
              taskTotal += subtask.total
            })
            if(taskData.id != task.id) {
                estTotal += taskTotal
                return arr.concat({
                    ...task,
                    total: taskTotal
                })
            } else {
                return arr
            }
          }, []), 
          total: estTotal
        }
        dispatch({ type: 'calculateOnDeleteTask', payload: calculatedEstimate })
    }

  return (
    <EstimateContext.Provider value={{estimate, dispatch}}>
        <div className='estimate-form'>
            <div className='estimate-template'>
                <FaTimes 
                    onClick={() => (setEstimateFormRendered(false), setEditEstimateData(null))}
                    style={{ color: '#0C243C', 
                             position: 'absolute',
                             top: '.5rem',
                             left: '.5rem'}}/>
                <form className='heading-and-inputs'>
                    <div className='estimate-name-heading'>
                        <label>Estimate Name:</label>
                        <input {...register("estimateName")}></input>
                        {errors.estimateName && <p>{errors.estimateName?.message}</p>}
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Customer Name:</label>
                        <input {...register("customerName")}></input>
                        {errors.customerName && <p>{errors.customerName?.message}</p>}
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Customer Email:</label>
                        <input {...register("customerEmail")}></input>
                        {errors.customerEmail && <p>{errors.customerEmail?.message}</p>}
                    </div>
                    <div className='estimate-template-fields'>
                        <label>Property Address:</label>
                        <input {...register("address")}></input>
                        {errors.address && <p>{errors.address?.message}</p>}
                    </div>
                </form>
                <div className='form-tasks'>
                    <h2 className='tasks-list-heading'>Tasks</h2>
                    <button onClick={() => setTaskFormRendered(true)} className='add-task-button'>Add Task</button>
                    <ul className='task-form-list'>
                        {estimate.tasks.map((task) => (
                            <li key={task.id}>
                                <Task 
                                    task={task}
                                    setTaskID={setTaskID}
                                    setSubtaskFormRendered={setSubtaskFormRendered}
                                    setEditSubtaskData={setEditSubtaskData}
                                    setTaskFormRendered={setTaskFormRendered}
                                    setEditTaskData={setEditTaskData}
                                    calculate={calculate}
                                    calculateOnDeleteTask={calculateOnDeleteTask}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='buttons-and-price'>
                    <button className='estimate-form-buttons'>Preview Estimate</button>
                    <button onClick={handleSubmit(editEstimateData == null || undefined ? addEst : editEst)} className='estimate-form-buttons'>Save</button>
                    <button className='estimate-form-buttons'>Save & Send</button>
                    <h1 className='estimate-form-total'>{estimate.total ? `$${estimate.total.toFixed(2)}` : '$0.00'}</h1>
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
                setEditSubtaskData={setEditSubtaskData}
                calculate={calculate}/>}
        </div>
    </EstimateContext.Provider>
  )
}

export default EstimateForm