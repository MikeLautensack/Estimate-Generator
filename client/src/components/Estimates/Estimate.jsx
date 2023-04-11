import React from 'react'
import './css/Estimate.css'
import { FaTimes } from 'react-icons/fa'
import { useState, useContext } from 'react'
import DataContext from '../../context/DataContext'
import TaskListItem from './TaskListItem'

const Estimate = ({ setEstimateRendered, estimate }) => {

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
                <h1 className='name'>{estimate.estimateName}</h1>
                <h2>{estimate.customerName}</h2>
                <h2>{estimate.customerEmail}</h2>
                <h2>{estimate.address}</h2>
            </div>
            <div className='tasks'>
                <h2 className='tasks-list-heading'>Tasks</h2>
                <ul className='task-list'>
                    {estimate.tasks.map((task) => (
                        <li key={task.id}>
                            <TaskListItem task={task}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='buttons-and-price'>
                <h1 className='estimate-total'>{estimate.total ? `$${estimate.total}` : '$0.00'}</h1>
            </div>
        </div>
    </div>
  )
}

export default Estimate