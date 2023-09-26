'use client'

import React from 'react'
import { useState } from 'react'
import Button from '../Button'
import { FaRegEye, FaRegEyeSlash, FaFacebook, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useForm, SubmitHandler  } from 'react-hook-form'
import { RegisterFormValues } from '@/types/types'

const RegisterForm = () => {

  const [ passwordEyeOpen, setPasswordEyeOpen ] = useState(false)
  const [ confirmEyeOpen, setConfirmEyeOpen ] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>()

  const renderPasswordEye = () => {
    if(passwordEyeOpen) {
        return <FaRegEye />
    } else {
        return <FaRegEyeSlash />
    }
  }

  const renderConfirmEye = () => {
    if(confirmEyeOpen) {
        return <FaRegEye />
    } else {
        return <FaRegEyeSlash />
    }
  }

  const togglePasswordEye = (event: any) => {
    event.preventDefault()
    setPasswordEyeOpen(!passwordEyeOpen)
  }

  const toggleConfirmEye = (event: any) => {
    event.preventDefault()
    setConfirmEyeOpen(!confirmEyeOpen)
  }

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    const res = await fetch('http://localhost:3000/api/users/createuser', {
    method: 'POST',
    body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
    }),
  }) 
  console.log(res)
  }

  return (
    <form className='bg-primary50 m-8 p-4 rounded w-4/5 tablet:w-3/5 desktop:w-1/2 max-w-xl' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-[32px] font-bold font-sans text-secondary500 text-center'>Sign Up Free</h1>
        <div className='my-2'>
            <label className=''>Name</label>
            <input className='w-full rounded p-1' {...register("name", { required: true })}></input>
        </div>
        <div className='my-2'>
            <label className=''>Email Address</label>
            <input className='w-full rounded p-1' {...register("email", { required: true })}></input>
        </div>
        <div className='my-2'>
            <label className=''>Password</label>
            <div className='relative'>
                <input className='w-full rounded p-1' type={passwordEyeOpen ? 'text' : 'password'} {...register("password", { required: true })}></input>
                <Button
                    className='absolute top-2 right-2'
                    onClick={togglePasswordEye}
                >
                    {renderPasswordEye()}
                </Button>
            </div>
        </div>
        <div className='my-2'>
            <label className=''>Confirm Password</label>
            <div className='relative'>
                <input className='w-full rounded p-1' type={confirmEyeOpen ? 'text' : 'password'} {...register("confirmPassword", { required: true })}></input>
                <Button
                    className='absolute top-2 right-2'
                    onClick={toggleConfirmEye}
                >
                    {renderConfirmEye()}
                </Button>
            </div>
        </div>
        <div className='flex justify-between my-2'>
            <div className='flex gap-2'>
                <input className='' type='checkbox'></input>
                <label className=''>Remember me</label>
            </div>
            <Button
                className=''
            >
                Forgot Password?
            </Button>
        </div>
        <Button                          
            className='w-full bg-primary500 text-primary100 py-2 font-sans rounded'
            
        >
            Sign Up FREE
        </Button>
        <div id='divider' className='w-full border border-secondary300 my-4'></div>
        <p className='text-base font-normal text-secondary500 text-center m-2 font-sans'>Or log in with:</p>
        <div className='flex flex-col gap-2 tablet:flex-row justify-evenly'>
            <Button
                className='border-2 border-primary500 text-primary500 text-base font-sans font-medium flex-grow rounded'
            >
                <div className='flex gap-2 justify-center items-center'>
                    <FcGoogle />
                    <p className=''>Google</p>
                </div>
            </Button>
            <Button
                className='border-2 border-primary500 text-primary500 text-base font-sans font-medium flex-grow rounded'
            >
                <div className='flex gap-2 justify-center items-center'>
                    <FaFacebook />
                    <p className=''>Facebook</p>
                </div>
            </Button>
            <Button
                className='border-2 border-primary500 text-primary500 text-base font-sans font-medium flex-grow rounded'
            >
                <div className='flex gap-2 justify-center items-center'>
                    <FaTwitter />
                    <p className=''>Twitter</p>
                </div>
            </Button>
        </div>
        <div id='divider2' className='w-full border border-secondary300 my-4'></div>
        <div className='flex justify-center'>
            <p className='text-[14px] text-secondary500 font-normal font-sans'>Already have an account?</p>
            <Button
                className='text-[14px] font-sans font-normal text-secondary500'
            >
                Login
            </Button>
        </div>
    </form>
  )
}

export default RegisterForm