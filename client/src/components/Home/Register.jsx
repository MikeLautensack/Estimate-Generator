import React from 'react'
import './css/Register.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import DataContext from '../../context/DataContext.jsx'
import { validateRegister } from '../../validations/validations.js'
import { yupResolver } from '@hookform/resolvers/yup'

const Register = () => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(validateRegister)
  })
  const nav = useNavigate()
  const { setUser, setJWT } = useContext(DataContext)

  const registerUser = async (username,
                              email, 
                              password, 
                              password1) => {
    return axios.post('http://193.46.198.215:9000/users/register', {
      username,
      email,
      password,
      password1
    })
    .then((response) => {
      if(response.status == 201) {
        setUser(response.data.user)
        setJWT(response.data.token)
        nav('/Dashboard')
        console.log('test')
      }
      console.log('test12334')
    })
    .catch((err) => {
      setError('root.serverError', {
        type: 400,
        message: err.response.data.message
      })
    })
  }

  const createAccount = async (data) => {
    const { username, email, password, password1} = data
    const isValid = await validateRegister.isValid(data) 
    if(isValid) {
      registerUser(username, email, password, password1)
    }
    
  }

  return (
    <form onSubmit={handleSubmit(createAccount)} className='register'>
        <div className='register-inputs'>
          <label className='username-label'>Username</label>
          <input {...register("username")} className='username-input'></input>
          {errors.username && <p style={{ color: '#C70000'}}>{errors.username?.message}</p>}
          <label className='email-label'>Email</label>
          <input {...register("email")} className='email-input'></input>
          {errors.email && <p style={{ color: '#C70000'}}>{errors.email?.message}</p>}
          <label className='password-label'>Password</label>
          <input {...register("password")} className='password-input' type='password'></input>
          {errors.password && <p style={{ color: '#C70000'}}>{errors.password?.message}</p>}
          <label className='password1-label'>Verify Password</label>
          <input {...register("password1")} className='password1-input' type='password'></input>
          {errors.password1 && <p style={{ color: '#C70000'}}>{errors.password1?.message}</p>}
          {errors.root?.serverError?.type === 400 && <p style={{ color: '#C70000'}}>{errors.root?.serverError?.message}</p>}
        </div>
        <div className='register-buttons'>
          <button className='button'>Create Account and Login</button>
        </div>
    </form>
  )
}

export default Register