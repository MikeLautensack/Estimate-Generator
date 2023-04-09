import React, { useContext, useEffect } from 'react'
import Nav from '../Nav/Nav'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import './css/Customers.css'
import Customer from './Customer'
import NewCustomerForm from './NewCustomerForm';
import DataContext from '../../context/DataContext'
import useAPI from '../../hooks/useAPI.js'
import { FaPlus } from "react-icons/fa"

const Customers = () => {

  const data = useContext(DataContext)
  const { jwt, customers, setCustomers } = data
  const [customerFormVis, setCustomerFormVis] = useState(false)
  const [formData, setFormData] = useState()
  const [navVis, setNavVis] = useState(false)
  const [customerList, setCustomerList] = useState([])
  const { addCustomer, updateCustomer, deleteCustomer } = useAPI()

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

  const add = (inputData) => {
      const { name, email, phoneNumber, address } = inputData
      const newCustomer = {
        _id: Math.random(),
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        dateCreated: new Date(),
        dateModified: new Date(),
        estimates: []
      }
      const newCustomerList = [...customerList, newCustomer]
      setCustomerList(newCustomerList)
      setCustomerFormVis(false)
      setCustomers(newCustomerList)
      addCustomer(jwt, newCustomer)
  }

  const edit = (inputData) => {
    const { name, email, phoneNumber, address } = inputData
    const editedCustomerList = customerList.map((customer) => {
        if (customer._id === formData._id) {
          const editedCustomer = {
            _id: customer._id,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            address: address,
            dateModified: new Date(),
            estimates: []
          }
          updateCustomer(jwt, editedCustomer, editedCustomer._id)
          return editedCustomer
        } else {
          return customer
        }
 
    })
    setCustomerList(editedCustomerList)
    setCustomerFormVis(false)
    setFormData(null)
    setCustomers(editedCustomerList)
  }

  const deleteCust = (_id) => {
      const list = customerList.filter((customer) => {
        if(customer._id !== _id) {
          return customer
        }
        deleteCustomer(jwt, customer, customer._id)
      })
      setCustomerList(list)
      setCustomers(list)
  }

  return (
    <main className='customers'>
      <button className='customers-sidebar-button' data-vis={navVis} onClick={changeNavVis}><FaBars /></button>
      <div className='customers-sidebar' data-vis={navVis}>
        <Nav />
      </div>  
      <div className='customers-content'>
          <div className='customer-content-top'>
            <h1 className='customer-heading'>Customers</h1>
          </div>
          <div className='customers-card'>
              <div className='add-customer-icon-box'>
                  <FaPlus onClick={() => setCustomerFormVis(true)} className='add-customer-icon'/>
              </div>
              <ul className='customer-list'>
                  {customerList.map((customer) => (
                    <li className='customer-list-item' key={customer._id}>
                        <Customer 
                            customer={customer}
                            setCustomerFormVis={setCustomerFormVis}
                            setFormData={setFormData}
                            deleteCust={deleteCust}
                            />
                    </li>
                  ))}
                  {customerFormVis === true && <NewCustomerForm 
                    setCustomerFormVis={setCustomerFormVis}
                    add={add}
                    edit={edit}
                    formData={formData}
                    setFormData={setFormData}/>}
              </ul>
          </div>
      </div>
    </main>
  )
}

export default Customers