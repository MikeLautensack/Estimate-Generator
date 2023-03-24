import React from 'react'
import './css/Login.css'
import { Link } from 'react-router-dom'

const Login = ({ setRegisterFormVis }) => {
  
  return (
    <form className='login'>
        <label className='email-label' htmlFor='email'>Email</label>
        <input className='email-input' type='email' id='email' name='email'></input>
        <label className='password-label' htmlFor='password'>Password</label>
        <input className='password-input' type='password' id='password' name='password'></input>
        <div className='buttons'>
          <button className='button'>Log In</button>
          <Link to='/dashboard'><button className='button'>Log In As Guest</button></Link>
          <button onClick={() => setRegisterFormVis(true)} className='button'>Create an Accout</button>
        </div>
    </form>
  )
}

export default Login