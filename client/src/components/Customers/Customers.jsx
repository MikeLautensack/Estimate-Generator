import React from 'react'
import Nav from '../Nav'
import CustomersList from '../Customers/CustomersList'

const Customers = () => {
  return (
    <div className='flex h-screen bg-white'>
      <div className='w-[20%]'>
        <Nav />
      </div>  
      <div className=' flex flex-col w-[80%]'>
        <div className='flex justify-around h-[20%] m-8'>
          <h1>Customers</h1>
          <div>
            <button>Add New Customer</button>
          </div>
        </div>
        <CustomersList />
      </div>
    </div>
  )
}

export default Customers