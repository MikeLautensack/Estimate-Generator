import React, { useContext, useEffect } from 'react'
import Nav from '../Nav/Nav'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import './css/Customers.css'
import Customer from './Customer'
import NewCustomerForm from './NewCustomerForm';
import UserContext from '../../context/DataContext'

const Customers = () => {

  const userData = useContext(UserContext)
  const { customers, setCustomers } = userData
  const [newCustomerFormRendered, setNewCustomerFormRendered] = useState(false);
  const [editCustomerFormData, setEditCustomerFormData] = useState()
  const [navVis, setNavVis] = useState(false)
  const [customerList, setCustomerList] = useState([])

  useEffect(() => {
    setCustomerList(customers)
  }, [])

  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }
  }

  const addCustomer = (inputData) => {
      const { firstName, lastName, email, phoneNumber, address} = inputData
      const id = customerList.length ? customerList[customerList.length -1].id + 1 : 1
      const newCustomer = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        estimates: []
      }
      const newCustomerList = [...customerList, newCustomer]
      setCustomerList(newCustomerList)
      setNewCustomerFormRendered(false)
      setCustomers(newCustomerList)
  }

  const editCustomer = (inputData) => {
    const { firstName, lastName, email, phoneNumber, address} = inputData
    const editedCustomerList = customerList.map((customer) => {
        if (customer.id === editCustomerFormData.id) {
          const editedCustomer = {
            id: customer.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            estimates: []
          }
          return editedCustomer
        } else {
          return customer
        }
 
    })
    setCustomerList(editedCustomerList)
    setNewCustomerFormRendered(false)
    setEditCustomerFormData(null)
    setCustomers(editedCustomerList)
  }

  const deleteCustomer = (id) => {
      const list = customerList.filter((customer) => customer.id !== id)
      setCustomerList(list)
      setCustomers(list)
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
            <button onClick={() => setNewCustomerFormRendered(true)} className='new-customer-button'>New Customer</button>
          </div>
          <div className='customers-card'>
              <ul className='customer-list'>
                  {customerList.map((customer) => (
                    <li className='customer-list-item' key={customer.id}>
                        <Customer 
                            customer={customer}
                            customerName={customer.firstName + " " + customer.lastName}
                            customerEmail={customer.email}
                            customerPhoneNumber={customer.phoneNumber}
                            deleteCustomer={deleteCustomer}
                            customerID={customer.id}
                            setEditCustomerFormData={setEditCustomerFormData}
                            setNewCustomerFormRendered={setNewCustomerFormRendered}
                            />
                    </li>
                  ))}
                  {newCustomerFormRendered === true && <NewCustomerForm 
                    setNewCustomerFormRendered={setNewCustomerFormRendered}
                    addCustomer={addCustomer}
                    editCustomer={editCustomer}
                    editCustomerFormData={editCustomerFormData}
                    setEditCustomerFormData={setEditCustomerFormData}/>}
              </ul>
          </div>
      </div>
    </main>
  )
}

export default Customers