import React, { useState, useEffect } from 'react'
import './css/NewCustomerForm.css'
import { FaTimes } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { validateCustomer } from '../../validations/validations.js'
import { yupResolver } from '@hookform/resolvers/yup'

const NewCustomerForm = ({ setCustomerFormVis, 
                           add,
                           edit,
                           formData,
                           setFormData}) => {

    const [customerData, setCustomerData] = useState()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validateCustomer)
    })

    useEffect(() => {
        setCustomerData(formData)
    }, [])

    if (customerData != null || undefined) {
        const { name , email, phoneNumber, address} = customerData
        setValue("name", name)
        setValue("email", email)
        setValue("phoneNumber", phoneNumber)
        setValue("address", address)
    }

    const onExit = () => {
        setCustomerFormVis(false)
        setFormData(null)
    }
    

    return (
      <form onSubmit={handleSubmit(customerData == null || undefined ? add : edit)} className='new-customer-form'>
          <FaTimes 
              onClick={() => (onExit())}
              style={{ color: 'white', 
                           position: 'absolute',
                           top: '.5rem',
                           left: '.5rem'}}/>
          <div className='new-customer-input-feilds-box'>
              <div className='new-customer-input-feilds'>
                  <label>First Name:</label>
                  <input {...register("name", {required: true})}></input>
                  {errors.name && <p>{errors.name?.message}</p>}
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Email:</label>
                  <input {...register("email", {required: true})}></input>
                  {errors.email && <p>{errors.email?.message}</p>}
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Phone Number:</label>
                  <input {...register("phoneNumber", {required: true})}></input>
                  {errors.phoneNumber && <p>{errors.phoneNumber?.message}</p>}
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Address:</label>
                  <input {...register("address")}></input>
                  {errors.address && <p>{errors.address?.message}</p>}
              </div>
          </div>
          <button className='new-customer-form-submit-button'>{customerData == null || undefined ? "Add New Customer" : "Edit Customer"}</button>
      </form>
    )
}

export default NewCustomerForm