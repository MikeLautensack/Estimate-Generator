import React from 'react'
import './css/Login.css'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
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
    return axios.post('http://localhost:9000/users/login', {
        email,
        password
    })
    .then((response) => {
        if(response.status === 200) {
            setUser(response.data.user)
            setJWT(response.data.token)
            getCustomers(response.data.token)
            getEstimates(response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', JSON.stringify(response.data.token))
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
        <label className='email-label'>Email</label>
        <input {...register("email")} className='login-email-input'></input>
        {errors.email && <p style={{ color: '#C70000'}}>{errors.email?.message}</p>}
        <label className='password-label'>Password</label>
        <input {...register("password")} className='login-password-input' type='password'></input>
        {errors.password && <p style={{ color: '#C70000'}}>{errors.password?.message}</p>}
        {errors.root?.serverError?.type === 400 && <p style={{ color: '#C70000'}}>{errors.root?.serverError?.message}</p>}
        <div className='login-buttons'>
          <button type='submit' className='button'>Log In</button>
          <button type='button' onClick={loginAsGuest} className='button'>Log In As Guest</button>
          <button type='button' onClick={() => setRegisterFormVis(true)} className='button'>Create an Accout</button>
        </div>
    </form>
  )
}

export default Login