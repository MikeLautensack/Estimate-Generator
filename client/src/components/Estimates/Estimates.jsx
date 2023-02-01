import React from 'react'
import Nav from '../Nav'
import EstimatesList from './EstimatesList'

const Estimates = () => {
  return (
    <div className='flex h-screen bg-white'>
      <div className='w-[20%]'>
        <Nav />
      </div>  
      <div className=' flex flex-col w-[80%]'>
        <div className='flex justify-around h-[20%] m-8'>
          <h1>Estimates</h1>
          <div>
            <button>Add New Estimate</button>
          </div>
        </div>
        <EstimatesList />
      </div>
    </div>
  )
}

export default Estimates