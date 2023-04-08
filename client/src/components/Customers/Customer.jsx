import React from 'react'
import './css/Customer.css'

const Customer = ({ customer,
                    setCustomerFormVis,
                    setFormData,
                    deleteCust}) => {
  return (
    <div className='customer'>
        <div className='customer-text'>
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.phoneNumber}</p>
        </div>
        <div className='button-box'>
            <button onClick={() => (setCustomerFormVis(true), setFormData(customer))} className='edit-customer'>Edit</button>
            <button onClick={() => deleteCust(customer._id)} className='delete-customer'>Delete</button>
        </div>
    </div>
  )
}

export default Customer