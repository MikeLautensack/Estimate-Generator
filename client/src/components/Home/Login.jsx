import React from 'react'
import './css/Login.css'
import { useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react'
import DataContext from '../../context/DataContext.jsx'
import useAPI from '../../hooks/useAPI.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { validateLogin } from '../../validations/validations.js'
import { yupResolver } from '@hookform/resolvers/yup'

const Login = ({ setRegisterFormVis }) => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(validateLogin)
  })
  const { setUser, setJWT } = useContext(DataContext)
  const { getCustomers, getEstimates } = useAPI()
  const nav = useNavigate()

  const loginUser = async (email, password) => {
    return axios.post('http://localhost:5000/users/login', {
        email,
        password
    })
    .then((response) => {
        if(response.status == 200) {
            setUser(response.data.user)
            setJWT(response.data.token)
            getCustomers(response.data.token)
            getEstimates(response.data.token)
            nav('/Dashboard')
        }
    })
    .catch((err) => {
      setError('root.serverError', {
        type: 400,
        message: err.response.data.message
      })
    })
}
  
  const login = async (data) => {
     const { email, password } = data
     const isValid = await validateLogin.isValid(data) 
      if(isValid) {
        loginUser(email, password)
      }  
  }

  const loginAsGuest = () => {
     loginUser("demouser@gmail.com", "pass")
  }

  return (
    <form onSubmit={handleSubmit(login)} className='login'>
        <label className='email-label' htmlFor='email'>Email</label>
        <input {...register("email")} className='email-input' type='email' id='email' name='email'></input>
        {errors.email && <p>{errors.email?.message}</p>}
        <label className='password-label' htmlFor='password'>Password</label>
        <input {...register("password")} className='password-input' type='password' id='password' name='password'></input>
        {errors.password && <p>{errors.password?.message}</p>}
        {errors.root?.serverError?.type === 400 && <p>{errors.root?.serverError?.message}</p>}
        <div className='buttons'>
          <button type='submit' className='button'>Log In</button>
          <button type='button' onClick={loginAsGuest} className='button'>Log In As Guest</button>
          <button type='button' onClick={() => setRegisterFormVis(true)} className='button'>Create an Accout</button>
        </div>
    </form>
  )
}

export default Login