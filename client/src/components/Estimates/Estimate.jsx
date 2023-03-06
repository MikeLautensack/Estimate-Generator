import React from 'react'
import './css/Estimate.css'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const Estimate = ({ setEstimateRendered }) => {

    const [estimate, setEstimate] = useState()
    const [tasks, setTasks] = useState()

  return (
    <div className='estimate'>
        <div className='estimate-doc'>
            <FaTimes 
                onClick={() => setEstimateRendered(false)}
                style={{ color: 'white', 
                         position: 'absolute',
                         top: '.5rem',
                         left: '.5rem'}}/>
            <div className='customer-data'>
                <h1 className='name'>Estimate Name</h1>
                <h2>Customer Name:</h2>
                <h2>Customer Email:</h2>
                <h2>Customer Phone:</h2>
                <h2>Property Address:</h2>
                <h2>Estimate Number:</h2> 
            </div>
            <div className='tasks'>
                <h2 className='tasks-list-heading'>Tasks</h2>
                <div className='task-list'>
                    
                </div>
            </div>
            <div className='buttons-and-price'>
                <button className='estimate-buttons'>Delete</button>
                <button className='estimate-buttons'>Edit</button>
                <button className='estimate-buttons'>Send</button>
                <h1 className='estimate-total'>$0.00</h1>
            </div>
        </div>
    </div>
  )
}

export default Estimate