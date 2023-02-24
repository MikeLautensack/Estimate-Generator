import React from 'react'
import './NewCustomerForm.css'
import { FaTimes } from 'react-icons/fa'

const NewCustomerForm = ({ setCustomerFormRendered }) => {
  return (
    <form className='new-customer-form'>
        <FaTimes 
            onClick={() => setCustomerFormRendered(false)}
            style={{ color: 'white', 
                         position: 'absolute',
                         top: '.5rem',
                         left: '.5rem'}}/>
        <div className='new-customer-input-feilds-box'>
            <div className='new-customer-input-feilds'>
                <label>First Name:</label>
                <input placeholder='First Name:'></input>
            </div>
            <div className='new-customer-input-feilds'>
                <label>Last Name:</label>
                <input placeholder='Last Name:'></input>
            </div>
            <div className='new-customer-input-feilds'>
                <label>Email:</label>
                <input placeholder='Email:'></input>
            </div>
            <div className='new-customer-input-feilds'>
                <label>Phone Number:</label>
                <input placeholder='Phone Number:'></input>
            </div>
            <div className='new-customer-input-feilds'>
                <label>Address:</label>
                <input placeholder='Address:'></input>
            </div>
        </div>
        <button className='new-customer-form-submit-button'>Create New Customer</button>
    </form>
  )
}

export default NewCustomerForm