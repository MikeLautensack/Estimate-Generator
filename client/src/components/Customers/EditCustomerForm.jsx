import React, { useEffect, useState } from 'react'
import './EditCustomerForm.css'
import { FaTimes } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

const EditCustomerForm = ({ setEditCustomerFormRendered, 
                            editCustomer,
                            editCustomerFormData,
                            setEditedCustomerID}) => {

    const { register, handleSubmit, setValue} = useForm()

    const [error, setError] = useState()

    const { id, firstName, lastName, email, phoneNumber, address} = editCustomerFormData

    useEffect(() => {
        setValue("firstName", firstName)
        setValue("lastName", lastName)
        setValue("email", email)
        setValue("phoneNumber", phoneNumber)
        setValue("address", address)
        setEditedCustomerID(id)
    }, [])

    return (
      <form onSubmit={handleSubmit(editCustomer)} className='edit-customer-form'>
          <FaTimes 
              onClick={() => setEditCustomerFormRendered(false)}
              style={{ color: 'white', 
                           position: 'absolute',
                           top: '.5rem',
                           left: '.5rem'}}/>
          <div className='edit-customer-input-feilds-box'>
              <div className='edit-customer-input-feilds'>
                  <label>First Name:</label>
                  <input {...register("firstName", {required: true})} placeholder='First Name:'></input>
              </div>
              <div className='edit-customer-input-feilds'>
                  <label>Last Name:</label>
                  <input {...register("lastName", {required: true})} placeholder='Last Name:'></input>
              </div>
              <div className='edit-customer-input-feilds'>
                  <label>Email:</label>
                  <input {...register("email", {required: true})} placeholder='Email:'></input>
              </div>
              <div className='edit-customer-input-feilds'>
                  <label>Phone Number:</label>
                  <input {...register("phoneNumber", {required: true})} placeholder='Phone Number:'></input>
              </div>
              <div className='edit-customer-input-feilds'>
                  <label>Address:</label>
                  <input {...register("address")} placeholder='Address:'></input>
              </div>
          </div>
          <button className='edit-customer-form-submit-button'>Edit Customer</button>
      </form>
    )
}

export default EditCustomerForm