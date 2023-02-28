import React, { useState, useEffect } from 'react'
import './css/NewCustomerForm.css'
import { FaTimes } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

const NewCustomerForm = ({ setNewCustomerFormRendered, 
                           addCustomer,
                           editCustomer,
                           editCustomerFormData}) => {

    const [customerData, setCustomerData] = useState()

    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        setCustomerData(editCustomerFormData)
    }, [])

    if (customerData != null || undefined) {
        const { firstName, lastName, email, phoneNumber, address} = customerData
        setValue("firstName", firstName)
        setValue("lastName", lastName)
        setValue("email", email)
        setValue("phoneNumber", phoneNumber)
        setValue("address", address)
    }

    

    return (
      <form onSubmit={handleSubmit(customerData == null ? addCustomer : editCustomer & setCustomerData(null))} className='new-customer-form'>
          <FaTimes 
              onClick={() => (setNewCustomerFormRendered(false), setCustomerData(null))}
              style={{ color: 'white', 
                           position: 'absolute',
                           top: '.5rem',
                           left: '.5rem'}}/>
          <div className='new-customer-input-feilds-box'>
              <div className='new-customer-input-feilds'>
                  <label>First Name:</label>
                  <input {...register("firstName", {required: true})} placeholder='First Name:'></input>
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Last Name:</label>
                  <input {...register("lastName", {required: true})} placeholder='Last Name:'></input>
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Email:</label>
                  <input {...register("email", {required: true})} placeholder='Email:'></input>
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Phone Number:</label>
                  <input {...register("phoneNumber", {required: true})} placeholder='Phone Number:'></input>
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Address:</label>
                  <input {...register("address")} placeholder='Address:'></input>
              </div>
          </div>
          <button className='new-customer-form-submit-button'>{customerData == null ? "Add New Customer" : "Edit Customer"}</button>
      </form>
    )
}

export default NewCustomerForm