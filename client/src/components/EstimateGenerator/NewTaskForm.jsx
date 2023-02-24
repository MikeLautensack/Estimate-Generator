import React from 'react'
import './NewTaskForm.css'
import { FaTimes } from 'react-icons/fa'

const NewTaskForm = ({ setNewTaskFormRendered }) => {
  return (
    <form className='new-task-form'>
        <FaTimes 
            onClick={() => setNewTaskFormRendered(false)}
            style={{ color: 'white', 
                         position: 'absolute',
                         top: '.5rem',
                         left: '.5rem'}}/>
        <div className='new-task-input-feilds-box'>
            <div className='new-task-input-feilds'>
                <label>Task Name:</label>
                <input placeholder='First Name:'></input>
            </div>
            <div className='new-task-input-feilds'>
                <label>Task Description:</label>
                <input placeholder='Last Name:'></input>
            </div>
        </div>
        <button className='new-task-form-submit-button'>Create New Task</button>
    </form>
  )
}

export default NewTaskForm