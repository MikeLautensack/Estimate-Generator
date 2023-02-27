import React from 'react'
import './Customer.css'

const Customer = ({ customer,
                    customerName,
                    customerEmail, 
                    customerPhoneNumber, 
                    deleteCustomer,
                    customerID,
                    setEditCustomerFormRendered,
                    setEditCustomerFormData}) => {
  return (
    <div className='customer'>
        <div className='customer-text'>
            <p className='customer-labels'>{customerName}</p>
            <p className='customer-labels'>{customerEmail}</p>
            <p className='customer-labels'>{customerPhoneNumber}</p>
        </div>
        <div className='button-box'>
            <button onClick={() => (setEditCustomerFormRendered(true), setEditCustomerFormData(customer))} className='edit-customer'>Edit</button>
            <button onClick={() => deleteCustomer(customerID)} className='delete-customer'>Delete</button>
        </div>
    </div>
  )
}

export default Customer