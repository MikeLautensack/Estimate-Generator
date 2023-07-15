import React from 'react'
import './css/Customer.css'
import { FaTrashAlt, FaEdit } from "react-icons/fa"

const Customer = ({ customer,
                    setCustomerFormVis,
                    setFormData,
                    deleteCust}) => {
  return (
    <div className='customer'>
        <div className='customer-text'>
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.phone_number}</p>
        </div>
        <div className='button-box'>
            <FaEdit onClick={() => (setCustomerFormVis(true), setFormData(customer))} className='edit-customer'/>
            <FaTrashAlt onClick={() => deleteCust(customer.customer_id)} className='delete-customer'/>
        </div>
    </div>
  )
}

export default Customer