import React, { useContext, useEffect, useState } from 'react'
import './css/SubtaskForm.css'
import { FaTimes } from 'react-icons/fa'
import TimeAndMaterialsForm from './TimeAndMaterialsForm'
import UnitRateForm from './UnitRateForm'
import CustomRateForm from './CustomRateForm'
import { useForm, useController, FormProvider } from 'react-hook-form'
import { EstimateContext } from './EstimateForm'

const SubtaskForm = ({ setSubtaskFormRendered, taskID }) => {

    const [tamFormVisable, setTamFormVisable] = useState(true)
    const [urFormVisable, setUrFormVisable] = useState(false)
    const [cFormVisable, setCFormVisable] = useState(false)
    const methods = useForm()
    const { register, handleSubmit, control} = methods
    const { field } = useController({ name: 'method', control})
    const estimateContext = useContext(EstimateContext)
    const { estimate, dispatch } = estimateContext
    
    const subtask = {
        taskID: taskID,
        id: 1,
        subtaskName: "",
        subtaskDescription: "",
        calcMethod: "",
        timeUnit: "",
        timePricePerUnit: 0.0,
        timeQuantity: 0.0,
        timeSubtotal: 0.0,
        materialsUnit: "",
        materialsPricePerUnit: 0.0,
        materialsQuantity: 0.0,
        materialsSubtotal: 0.0,
        unit: "",
        pricePerUnit: 0.0,
        quantity: 0.0,
        subtotal: 0.0,
        subtaskTotal: 0.0
    }

    const handleSelectChange = (data) => {
        field.onChange(data)
    }

    useEffect(() => {
        if(field.value === 'time-and-material') {
            setTamFormVisable(true)
            setUrFormVisable(false)
            setCFormVisable(false)
        } else if (field.value === 'unit') {
            setTamFormVisable(false)
            setUrFormVisable(true)
            setCFormVisable(false)
        } else if (field.value === 'custom') {
            setTamFormVisable(false)
            setUrFormVisable(false)
            setCFormVisable(true)
        }
    }, [field.value])

    const submit = (data) => {
        const newSubtask = {
            ...subtask,
            id: generateID(),
            subtaskName: data.subtaskName,
            subtaskDescription: data.subtaskDescription,
            calcMethod: data.method,
            timeUnit: data.timeUnit,
            timePricePerUnit: data.timePricePerUnit,
            timeQuantity: data.timeQuantity,
            timeSubtotal: calculateSubtotals(data.timePricePerUnit, data.timeQuantity),
            materialsUnit: data.materialsUnit,
            materialsPricePerUnit: data.materialsPricePerUnit,
            materialsQuantity: data.materialsQuantity,
            materialsSubtotal: calculateSubtotals(data.materialsPricePerUnit, data.materialsQuantity),
            unit: data.unit,
            pricePerUnit: data.pricePerUnit,
            quantity: data.quantity,
            subtotal: calculateSubtotals(data.pricePerUnit, data.quantity),
            total: calculateTotal(data.timePricePerUnit * data.timeQuantity, 
                                  data.materialsPricePerUnit * data.materialsQuantity,
                                  data.pricePerUnit, 
                                  data.quantity,
                                  data.price)
        }
        dispatch({ type: 'addSubtask', payload: newSubtask})
    }

    const calculateSubtotals = (var1, var2) => {
        return var1 * var2
    }

    const calculateTotal = (var1, var2, var3, var4, price) => {
        if(tamFormVisable === true) {
            return var1 + var2
        } else if (urFormVisable === true) {
            return var3 * var4
        } else if (cFormVisable === true) {
            return price
        }
    }

    const generateID = () => {
        const ID = Math.random()
        return ID
    }



  return (
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)} className='new-subtask-form'>
            <FaTimes 
                onClick={() => setSubtaskFormRendered(false)}
                style={{ color: 'white', 
                             position: 'absolute',
                             top: '.5rem',
                             left: '.5rem'}}/>
            <div className='new-task-input-feilds-box'>
                <div className='new-task-input-feilds'>
                    <label>Subtask Name:</label>
                    <input {...register("subtaskName")} placeholder='First Name:'></input>
                </div>
                <div className='new-task-input-feilds'>
                    <label>Subtask Description:</label>
                    <input {...register("subtaskDescription")} placeholder='Last Name:'></input>
                </div>
                <div className='new-task-input-feilds'>
                    <label>Method:</label>
                    <select value={field.value} onChange={handleSelectChange} name='select' id='methods'>
                        <option value="time-and-material">Time & Materials</option>
                        <option value="unit">Unit Rate</option>
                        <option value="custom">Custom</option>
                    </select>  
                </div>
                <div className='method-card'>
                    {tamFormVisable && <TimeAndMaterialsForm />}
                    {urFormVisable && <UnitRateForm />}
                    {cFormVisable && <CustomRateForm />}
                </div>
            </div>
            <button className='new-task-form-submit-button'>Create New Subtask</button>
        </form>
    </FormProvider>
  )
}

export default SubtaskForm