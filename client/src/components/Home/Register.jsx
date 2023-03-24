import React from 'react'
import './css/Register.css'

const Register = () => {
  return (
    <form className='register'>
        <label className='username-label' htmlFor='username'>Username</label>
        <input className='username-input' type='username' id='username' name='username'></input>
        <label className='password-label' htmlFor='password'>Password</label>
        <input className='password-input' type='password' id='password' name='password'></input>
        <label className='password1-label' htmlFor='password1'>Password1</label>
        <input className='password1-input' type='password1' id='password1' name='password1'></input>
        <label className='email-label' htmlFor='email'>Email</label>
        <input className='email-input' type='email' id='email' name='email'></input>
        <label className='name-label' htmlFor='name'>Name</label>
        <input className='name-input' type='name' id='name' name='name'></input>
        <label className='phone-number-label' htmlFor='phone-number'>Phone Number</label>
        <input className='phone-number-input' type='phone-number' id='phone-number' name='phone-number'></input>
        <div className='buttons'>
          <button className='button'>Create Account and Login</button>
        </div>
    </form>
  )
}

export default Register