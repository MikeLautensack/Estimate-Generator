import React from 'react'
import './css/Estimate.css'

const Estimate = () => {
  return (
    <div className='estimate'>
        <div className='estimate-text'>
            <p className='estimate-labels'>Customer 1</p>
            <p className='estimate-labels'>123 Example St</p>
            <p className='estimate-labels'>#123</p>
        </div>
        <div className='button-box'>
            <button className='edit-estimate'>Edit</button>
            <button className='delete-estimate'>Delete</button>
        </div>
    </div>
  )
}

export default Estimate