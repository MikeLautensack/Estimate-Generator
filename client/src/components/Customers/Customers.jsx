import React, { useContext } from 'react'
import Nav from '../Nav/Nav'
import { FaBars } from 'react-icons/fa'
import { useState } from 'react'
import './Customers.css'
import Customer from './Customer'
import NewCustomerForm from './NewCustomerForm';
import UserContext from '../../context/DataContext'

const Customers = () => {

  const userData = useContext(UserContext)

  const [newCustomerFormRendered, setCustomerFormRendered] = useState(false);
  const [navVis, setNavVis] = useState(false)
  const [customerList, setCustomerList] = useState([{
    "id": 1,
    "firstName": "Bob",
    "lastName": "Smith",
    "email": "email@gmail.com",
    "phoneNumber": "123-456-7890",
    "address": "123 Example St",
    "estimates": [
        {
            "estimateID": 0
        }
    ]
},
{
    "id": 2,
    "firstName": "Walter",
    "lastName": "White",
    "email": "breakingbad@gmail.com",
    "phoneNumber": "123-456-7890",
    "address": "666 Meth St",
    "estimates": [
        {
            "estimateID": 0
        }
    ]
},
{
    "id": 3,
    "firstName": "John",
    "lastName": "Snow",
    "email": "kinginthenorth@gmail.com",
    "phoneNumber": "123-456-7890",
    "address": "123 wall Rd",
    "estimates": [
        {
            "estimateID": 0
        }
    ]
}])

  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }
  }

  const addCustomer = () => {
    
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