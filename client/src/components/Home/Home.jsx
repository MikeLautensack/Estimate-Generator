import React from 'react'
import Login from './Login'

const Home = () => {
  return (
    <div className="h-screen bg-green-400 flex flex-col justify-center items-center">
      <div className='text-center w-[80%]'>
        <h3>Welcome</h3>
        <h6>to</h6>
        <h1>Estimate Generator</h1>
      </div>
      <Login />
    </div>
  )
}

export default Home