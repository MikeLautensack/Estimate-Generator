import React, { useReducer, useState, createContext, useEffect } from 'react'
import './css/EstimateForm.css'
import Task from './Task'
import { FaTimes, FaPlus } from 'react-icons/fa'
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
                    if(task.task_id === action.payload.task_id) {
                        return action.payload
                    } else {
                        return task
                    }
                })
            }
        case 'deleteTask':
            return {
                ...estimate,
                tasks: estimate.tasks.filter((task) => task.task_id !== action.payload.task_id)
            }
        case 'addSubtask':
            return {
                ...estimate,
                tasks: estimate.tasks.map((task) => {
                    if(task.task_id === action.payload.task_id) {
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
                    if(task.task_id === action.payload.task_id) {
                        return {
                            ...task,
                            subtasks: task.subtasks.map((subtask) => {
                                if(subtask.subtask_id === action.payload.subtask_id) {
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
                    if(task.task_id === action.payload.subtasksTask_id) {
                        return {
                            ...task,
                            subtasks: task.subtasks.filter((subtask) => subtask.subtask_id !== action.payload.subtask_id)
                        }
                    } else {
                        return {
                            ...task,
                            subtasks: task.subtasks
                        }
                    }
                })
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}

export const EstimateContext = createContext()

const EstimateForm = ({ setEstimateFormRendered,
                        setEstimateRendered,
                        add,
                        edit,
                        editEstimateData,
                        setEditEstimateData}) => {

    const [editTaskData, setEditTaskData] = useState()
    const [editSubtaskData, setEditSubtaskData] = useState()
    const [taskFormRendered, setTaskFormRendered] = useState(false)
    const [subtaskFormRendered, setSubtaskFormRendered] = useState(false)
    const [task_id, setTask_id] = useState(0)
    const [oneError, setOneError] = useState()
    const [twoErrors, setTwoErrors] = useState()
    const [threeErrors, setThreeErrors] = useState()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validateEstimate)
    })
    const [estimate, dispatch] = useReducer(reducer, 
    {
        estimate_id: 0,
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
            localStorage.setItem('estimate', JSON.stringify(editEstimateData))
        }
        localStorage.setItem('estimate', JSON.stringify(estimate))
    }, [])

    useEffect(() => {
        const numberOfErrors = Object.keys(errors).length
        if(numberOfErrors === 1) {
            setOneError(true)
            setTwoErrors(false)
            setThreeErrors(false)
        } else if (numberOfErrors === 2) {
            setOneError(false)
            setTwoErrors(true)
            setThreeErrors(false)
        } else if (numberOfErrors === 3) {
            setOneError(false)
            setTwoErrors(false)
            setThreeErrors(true)
        } else if (numberOfErrors === 0) {
            setOneError(false)
            setTwoErrors(false)
            setThreeErrors(false)
        }
    }, [errors.estimateName, errors.customerName, errors.customerEmail])

    const generateID = (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const addEst = (data) => {
        const newEstimate = {
            ...estimate,
            estimate_id: generateID(1, 1000000000),
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

    const previewEstimate = (data) => {
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
        setEditEstimateData(updatedEstimate)
        setEstimateFormRendered(false)
        setEstimateRendered(true)
    }

    const calculate = (object, asyncSubtaskTotalData, task_id, mode, editDataTotal, submissionDataTotal) => {
        let estTotal = 0
        const calculatedEstimate = {
          ...estimate,
          tasks: estimate.tasks.map((task) => {
            let taskTotal = 0
            task.subtasks.forEach((subtask) => {
              taskTotal += subtask.total
            })
            if(task_id === task.task_id) {
                if(mode === 'add') {
                    taskTotal += asyncSubtaskTotalData
                } else if (mode === 'edit') {
                    if(editDataTotal !== submissionDataTotal) {
                        taskTotal += asyncSubtaskTotalData - editDataTotal
                    }
                } else if (mode === 'delete') {
                    taskTotal = taskTotal - object.total
                }
            }
            estTotal += taskTotal
            if(mode === 'add') {
                if(task_id === task.task_id) {
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
            } else if (mode === 'edit') {
                if(task_id === task.task_id) {
                    if(editDataTotal !== submissionDataTotal) {
                        return {
                            ...task,
                            subtasks: task.subtasks.map((subtask) => {
                                if(subtask.subtask_id === object.subtask_id) {
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
            } else if (mode === 'delete') {
                if(task_id === task.task_id) {
                    return {
                        ...task,
                        subtasks: task.subtasks.filter((subtask) => {
                            if(subtask.subtask_id !== object.subtask_id) {
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
        dispatch({ type: 'calculateEstimate', payload: calculatedEstimate })
        console.log(calculatedEstimate, "tetsing12454")
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
            if(taskData.task_id !== task.task_id) {
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
                    <div>
                        <div className='estimate-name-heading'>
                            <label>Estimate Name:</label>
                            <input {...register("estimateName")}></input>
                        </div>
                        {errors.estimateName && <p style={{ color: '#C70000'}}>{errors.estimateName?.message}</p>}
                    </div>
                    <div>
                        <div className='estimate-template-fields'>
                            <label>Customer Name:</label>
                            <input {...register("customerName")}></input>
                        </div>
                        {errors.customerName && <p style={{ color: '#C70000'}}>{errors.customerName?.message}</p>}
                    </div>
                    <div>
                        <div className='estimate-template-fields'>
                            <label>Customer Email:</label>
                            <input {...register("customerEmail")}></input>
                        </div>
                        {errors.customerEmail && <p style={{ color: '#C70000'}}>{errors.customerEmail?.message}</p>}
                    </div>
                    <div>
                        <div className='estimate-template-fields'>
                            <label>Property Address:</label>
                            <input {...register("address")}></input>
                        </div>
                        {errors.address && <p style={{ color: '#C70000'}}>{errors.address?.message}</p>}
                    </div>
                </form>
                <div className={`form-tasks ${oneError ? 'oneError' : ''} ${twoErrors ? 'twoErrors' : ''} ${threeErrors ? 'threeErrors' : ''}`}>
                    <h2 className='tasks-list-heading'>Tasks</h2>
                    <FaPlus onClick={() => setTaskFormRendered(true)} className='add-task-button'/>
                    <ul className='task-form-list'>
                        {estimate.tasks.map((task) => (
                            <li key={task.task_id}>
                                <Task 
                                    task={task}
                                    setTask_id={setTask_id}
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
                    <button onClick={handleSubmit(previewEstimate)} className='estimate-form-preview-button'>Preview Estimate</button>
                    <button onClick={handleSubmit(editEstimateData == null || undefined ? addEst : editEst)} className='estimate-form-save-button'>Save</button>
                    {/*<button className='estimate-form-buttons'>Save & Send</button>*/}
                    <h1 className='estimate-form-total'>{estimate.total ? `$${estimate.total.toFixed(2)}` : '$0.00'}</h1>
                </div>
            </div>
            {taskFormRendered === true && <TaskForm 
                setTaskFormRendered={setTaskFormRendered}
                editTaskData={editTaskData}
                setEditTaskData={setEditTaskData}/>}
            {subtaskFormRendered === true && <SubtaskForm 
                setSubtaskFormRendered={setSubtaskFormRendered}
                task_id={task_id}
                editSubtaskData={editSubtaskData}
                setEditSubtaskData={setEditSubtaskData}
                calculate={calculate}/>}
        </div>
    </EstimateContext.Provider>
  )
}

export default EstimateForm