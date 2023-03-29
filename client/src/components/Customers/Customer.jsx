import React from 'react'
import './css/Customer.css'

const Customer = ({ customer,
                    setEditCustomerFormRendered,
                    setEditCustomerFormData,
                    deleteCust}) => {
  return (
    <div className='customer'>
        <div className='customer-text'>
            <p>{customer.firstName + "" + customer.lastName}</p>
            <p>{customer.email}</p>
            <p>{customer.phoneNumber}</p>
        </div>
        <div className='button-box'>
            <button onClick={() => (setEditCustomerFormRendered(true), setEditCustomerFormData(customer))} className='edit-customer'>Edit</button>
            <button onClick={() => deleteCust(customer.id)} className='delete-customer'>Delete</button>
        </div>
    </div>
  )
}

export default Customer