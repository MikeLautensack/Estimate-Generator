import React from 'react'
import './css/Login.css'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

const Login = ({ setRegisterFormVis }) => {

  const { register, handleSubmit } = useForm()
  const { loginUser } = useAuth()
  const nav = useNavigate()

  const login = (data) => {
     console.log(1)
     const { email, password } = data
     loginUser(email, password)
     nav('/Dashboard')
  }

  const loginAsGuest = () => {
     console.log(2)
     loginUser("demouser@gmail.com", "pass")
     nav('/Dashboard')
  }
  
  return (
    <form onSubmit={handleSubmit(login)} className='login'>
        <label className='email-label' htmlFor='email'>Email</label>
        <input {...register("email")} className='email-input' type='email' id='email' name='email'></input>
        <label className='password-label' htmlFor='password'>Password</label>
        <input {...register("password")} className='password-input' type='password' id='password' name='password'></input>
        <div className='buttons'>
          <button type='submit' className='button'>Log In</button>
          <button type='button' onClick={loginAsGuest} className='button'>Log In As Guest</button>
          <button type='button' onClick={() => setRegisterFormVis(true)} className='button'>Create an Accout</button>
        </div>
    </form>
  )
}

export default Login