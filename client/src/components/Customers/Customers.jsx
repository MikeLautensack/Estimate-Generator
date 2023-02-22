import React from 'react'
import Nav from '../Nav/Nav'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import '../css/Customers/Customers.css'
import Customer from '../Customer'
import NewCustomerForm from './NewCustomerForm';

const Customers = () => {

  const [newCustomerFormRendered, setNewCustomerFormRendered] = useState(false);
  const [navVis, setNavVis] = useState(false)
  const changeNavVis = () => {
      if (navVis === false) {
        setNavVis(true)
      } else {
        setNavVis(false)
      }

  }
  return (
    <div className='customers'>
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
              <div className='customer-list'>
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  <Customer />
                  {newCustomerFormRendered === true && <NewCustomerForm 
                    setNewCustomerFormRendered={setNewCustomerFormRendered}/>}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Customers