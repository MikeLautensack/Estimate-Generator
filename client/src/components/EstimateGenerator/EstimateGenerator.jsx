import React from 'react'
import Nav from '../Nav'
import NewEstimateTemplate from './NewEstimateTemplate'

const EstimateGenerator = () => {
  return (
    <div className='flex h-screen bg-white'>
      <div className='w-[20%]'>
        <Nav />
      </div>  
      <div className='w-[80%]'>
        <NewEstimateTemplate />
      </div>
    </div>
  )
}

export default EstimateGenerator