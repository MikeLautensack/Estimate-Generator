import React, { useEffect } from 'react'
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

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validateCustomer)
    })

    useEffect(() => {
        if (formData != null || undefined) {
            const { name , email, phone_number, address} = formData
            setValue("name", name)
            setValue("email", email)
            setValue("phone_number", parsePhoneNumber(phone_number))
            setValue("address", address)
        }
    }, [])

    const parsePhoneNumber = (formattedNumber) => {
        const digitsOnly = formattedNumber.replace(/\D/g, '')
        return digitsOnly
    }

    const onExit = () => {
        setCustomerFormVis(false)
        setFormData(null)
    }

    return (
      <form onSubmit={handleSubmit(formData == null || undefined ? add : edit)} className='new-customer-form'>
          <FaTimes 
              onClick={() => (onExit())}
              style={{ color: 'white', 
                           position: 'absolute',
                           top: '.5rem',
                           left: '.5rem'}}/>
          <div className='new-customer-input-feilds-box'>
              <div className='new-customer-input-feilds'>
                  <label>Name:</label>
                  <input {...register("name")}></input>
                  {errors.name && <p style={{ color: '#C70000'}}>{errors.name?.message}</p>}
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Email:</label>
                  <input {...register("email")}></input>
                  {errors.email && <p style={{ color: '#C70000'}}>{errors.email?.message}</p>}
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Phone Number:</label>
                  <input {...register("phone_number")}></input>
                  {errors.phone_number && <p style={{ color: '#C70000'}}>{errors.phone_number?.message}</p>}
              </div>
              <div className='new-customer-input-feilds'>
                  <label>Address:</label>
                  <input {...register("address")}></input>
                  {errors.address && <p style={{ color: '#C70000'}}>{errors.address?.message}</p>}
              </div>
          </div>
          <button className='new-customer-form-submit-button'>{formData == null || undefined ? "Add New Customer" : "Edit Customer"}</button>
      </form>
    )
}

export default NewCustomerForm