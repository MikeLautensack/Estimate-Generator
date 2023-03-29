import React from 'react'
import './css/Register.css'
import { useForm } from 'react-hook-form'
import registerUser from '../../hooks/useAuth'
import { redirect } from "react-router-dom"

const Register = () => {

  const { register, handleSubmit } = useForm()

  const createAccount = (data) => {
    const { username, email, password, password1} = data
    registerUser(username, email, password, password1)
    return redirect("/Dashboard")
  }

  return (
    <form onSubmit={handleSubmit(createAccount)} className='register'>
        <label className='username-label' htmlFor='username'>Username</label>
        <input {...register("username")} className='username-input' type='username' id='username' name='username'></input>
        <label className='email-label' htmlFor='email'>Email</label>
        <input {...register("email")} className='email-input' type='email' id='email' name='email'></input>
        <label className='password-label' htmlFor='password'>Password</label>
        <input {...register("password")} className='password-input' type='password' id='password' name='password'></input>
        <label className='password1-label' htmlFor='password1'>Verify Password</label>
        <input {...register("password1")} className='password1-input' type='password1' id='password1' name='password1'></input>
        <div className='buttons'>
          <button className='button'>Create Account and Login</button>
        </div>
    </form>
  )
}

export default Register