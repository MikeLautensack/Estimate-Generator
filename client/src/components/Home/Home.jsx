import React from 'react'
import Login from './Login'
import './Home.css'

const Home = () => {

  return (
    <div className="home">
      <h3 className='heading'>Welcome to Estimate Generator</h3>
      <Login />
    </div>
  )
}

export default Home