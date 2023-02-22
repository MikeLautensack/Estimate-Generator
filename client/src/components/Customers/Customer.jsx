import React from 'react'
import './Customer.css'

const Customer = () => {
  return (
    <div className='customer'>
        <div className='customer-text'>
            <p className='customer-labels'>Customer 1</p>
            <p className='customer-labels'>Email@gmail.com</p>
            <p className='customer-labels'>610-296-4153</p>
        </div>
        <div className='button-box'>
            <button className='edit-customer'>Edit</button>
            <button className='delete-customer'>Delete</button>
        </div>
    </div>
  )
}

export default Customer