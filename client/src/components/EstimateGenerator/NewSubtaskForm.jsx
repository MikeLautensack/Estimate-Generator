import React from 'react'
import './css/NewSubtaskForm.css'
import { FaTimes } from 'react-icons/fa'
import TimeAndMaterialsForm from './TimeAndMaterialsForm'
import UnitRateForm from './UnitRateForm'
import CustomRateForm from './CustomRateForm'

const NewSubtaskForm = ({ setNewSubtaskFormRendered }) => {
  return (
    <form className='new-subtask-form'>
        <FaTimes 
            onClick={() => setNewSubtaskFormRendered(false)}
            style={{ color: 'white', 
                         position: 'absolute',
                         top: '.5rem',
                         left: '.5rem'}}/>
        <div className='new-task-input-feilds-box'>
            <div className='new-task-input-feilds'>
                <label>Subtask Name:</label>
                <input placeholder='First Name:'></input>
            </div>
            <div className='new-task-input-feilds'>
                <label>Subtask Description:</label>
                <input placeholder='Last Name:'></input>
            </div>
            <div className='new-task-input-feilds'>
                <label>Method:</label>
                <select name='methods' id='methods'>
                    <option value="time-and-material">Time & Materials</option>
                    <option value="sqft">Square Feet</option>
                    <option value="lnft">Lineal Feet</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            <div className='method-card'>
                <CustomRateForm />
            </div>
        </div>
        <button className='new-task-form-submit-button'>Create New Subtask</button>
    </form>
  )
}

export default NewSubtaskForm