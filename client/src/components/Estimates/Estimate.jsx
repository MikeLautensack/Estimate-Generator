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
                style={{ color: '#0C243C', 
                         position: 'absolute',
                         top: '.5rem',
                         left: '.5rem'}}/>
            <div className='estimate-preview-customer-data'>
                <h1 className='name'>{estimate.estimateName}</h1>
                <h2 className='estimate-preview-data'>{estimate.customerName}</h2>
                <h2 className='estimate-preview-data'>{estimate.customerEmail}</h2>
                <h2 className='estimate-preview-data'>{estimate.address}</h2>
            </div>
            <div className='estimate-preview-tasks'>
                <h2 className='tasks-list-heading'>Tasks</h2>
                <ul className='task-list'>
                    {estimate.tasks.map((task) => (
                        <li key={task.id}>
                            <TaskListItem task={task}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='estimate-preview-buttons-and-price'>
                <h1 className='estimate-preview-total'>{estimate.total ? `$${estimate.total.toFixed(2)}` : '$0.00'}</h1>
            </div>
        </div>
    </div>
  )
}

export default Estimate