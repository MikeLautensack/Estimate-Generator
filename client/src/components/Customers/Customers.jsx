import React from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './Customers.css'
import Customer from './Customer'
import NewCustomerForm from './NewCustomerForm';

const Customers = () => {

  const [newCustomerFormRendered, setCustomerFormRendered] = useState(false);
  const [navVis, setNavVis] = useState(false)
  const [customerList, setCustomerList] = useState([
      {
        id: 1,
        firstName: "Bob",
        lastName: "Jones",
        email: "bobjones@example.com",
        phoneNumber: "610-111-2222",
        address: "275 Burger Dr",
      },
      {
        id: 2,
        firstName: "Walter",
        lastName: "White",
        email: "walterwhite@example.com",
        phoneNumber: "610-123-4567",
        address: "2385 Gold St",
      }
    ])

  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }
  }

  const createNewCustomer = () => {

  }

  const editCustomer = () => {

  }

  const deleteCustomer = (id) => {
      const list = customerList.filter((customer) => customer.id !== id)
      setCustomerList(list)
  }

  return (
    <main className='customers'>
      <button className='customers-sidebar-button' onClick={changeNavVis}><FaBars /></button>
      <div className='customers-sidebar' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='customers-content'>
          <div className='customer-content-top'>
            <h1 className='customer-heading'>Customers</h1>
            <button onClick={() => setCustomerFormRendered(true)} className='new-customer-button'>New Customer</button>
          </div>
          <div className='customers-card'>
              <ul className='customer-list'>
                  {customerList.map((customer) => (
                    <li className='customer-list-item' key={customer.id}>
                        <Customer 
                            customerName={customer.firstName + " " + customer.lastName}
                            customerEmail={customer.email}
                            customerPhoneNumber={customer.phoneNumber}
                            deleteCustomer={deleteCustomer}
                            customerID={customer.id}
                            setCustomerFormRendered={setCustomerFormRendered}
                            />
                    </li>
                  ))}
                  {newCustomerFormRendered === true && <NewCustomerForm 
                    setCustomerFormRendered={setCustomerFormRendered}/>}
              </ul>
          </div>
      </div>
    </main>
  )
}

export default Customers