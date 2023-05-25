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

  const { jwt, customers, setCustomers } = useContext(DataContext)
  const [customerFormVis, setCustomerFormVis] = useState(false)
  const [formData, setFormData] = useState()
  const [navVis, setNavVis] = useState(false)
  const { addCustomer, updateCustomer, deleteCustomer } = useAPI()

  useEffect(() => {
    console.log('1')
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
        customerID: Math.random(),
        name: name,
        email: email,
        phoneNumber: formatPhoneNumber(phoneNumber),
        address: address,
        dateCreated: new Date(),
        dateModified: new Date(),
      }
      const newCustomerList = [...customers, newCustomer]
      setCustomerFormVis(false)
      setCustomers(newCustomerList)
      localStorage.setItem('customers', JSON.stringify(newCustomerList))
      addCustomer(jwt, newCustomer)
  }

  const edit = (inputData) => {
    const { name, email, phoneNumber, address } = inputData
    const editedCustomerList = customers.map((customer) => {
        if (customer._id === formData._id) {
          const editedCustomer = {
            ... customer,
            name: name,
            email: email,
            phoneNumber: formatPhoneNumber(phoneNumber),
            address: address,
            dateModified: new Date(),
          }
          updateCustomer(jwt, editedCustomer, editedCustomer._id)
          return editedCustomer
        } else {
          return customer
        }
 
    })
    setCustomerFormVis(false)
    setFormData(null)
    setCustomers(editedCustomerList)
    localStorage.setItem('customers', JSON.stringify(editedCustomerList))
  }

  const deleteCust = (_id) => {
      const list = customers.filter((customer) => {
        if(customer._id !== _id) {
          return customer
        }
        deleteCustomer(jwt, customer, _id)
      })
      setCustomers(list)
      localStorage.setItem('customers', JSON.stringify(list))
  }

  const formatPhoneNumber = (number) => {
    const areaCode = number.slice(0, 3);
    const prefix = number.slice(3, 6);
    const lineNumber = number.slice(6, 10);
    return `(${areaCode}) ${prefix}-${lineNumber}`;
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
                  {customers.map((customer) => (
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