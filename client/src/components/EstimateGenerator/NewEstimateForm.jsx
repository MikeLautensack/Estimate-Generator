import React from 'react'
import './NewEstimateForm.css'
import Task from './Task'
import { FaTimes } from 'react-icons/fa'

const NewEstimateForm = ({ setEstimateGeneratorFormRendered }) => {
  return (
    <div className='estimate-generator-content'>
        <div className='estimate-template'>
            <FaTimes 
                onClick={() => setEstimateGeneratorFormRendered(false)}
                style={{ color: 'white', 
                         position: 'absolute',
                         top: '.5rem',
                         left: '.5rem'}}/>
            <div className='heading-and-inputs'>
                <h1 className='estimate-name-heading'>Estimate Name</h1>
                <div className='estimate-template-fields'>
                    <label>Customer Name:</label><input></input>
                </div>
                <div className='estimate-template-fields'>
                    <label>Customer Email:</label><input></input>
                </div>
                <div className='estimate-template-fields'>
                    <label>Customer Phone:</label><input></input>
                </div>
                <div className='estimate-template-fields'>
                    <label>Property Address:</label><input></input>
                </div>
                <div className='estimate-template-fields'>
                    <label>Estimate Number:</label><input></input>
                </div>
            </div>
            <div className='tasks'>
                <h2 className='tasks-list-heading'>Tasks</h2>
                <button className='add-task-button'>Add Task</button>
                <div className='task-list'>
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </div>
            </div>
            <div className='buttons-and-price'>
                <button className='estimate-buttons'>Preview Estimate</button>
                <button className='estimate-buttons'>Generate & Save</button>
                <button className='estimate-buttons'>Generate & Send Estimate</button>
                <h1 className='estimate-total'>$0.00</h1>
            </div>
        </div>
    </div>
  )
}

export default NewEstimateForm