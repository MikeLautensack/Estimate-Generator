import React, { useState } from 'react'
import Login from './Login'
import './css/Home.css'
import Register from './Register'

const Home = () => {

  const [registerFormVis, setRegisterFormVis] = useState(false)

  return (
    <div className="home">
      <h3 className='heading'>Welcome to Estimate Generator</h3>
      {registerFormVis === true ? <Register /> : <Login setRegisterFormVis={setRegisterFormVis}/>}
     
    </div>
  )
}

export default Home