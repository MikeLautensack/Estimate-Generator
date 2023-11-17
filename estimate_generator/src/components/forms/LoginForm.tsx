'use client'

import React from 'react'
import { useState } from 'react'
import Button from '../misc/Button'
import { FaRegEye, FaRegEyeSlash, FaFacebook, FaTwitter } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useForm, SubmitHandler  } from 'react-hook-form'
import { LoginFormValues } from '@/types/types'
import { signIn } from "next-auth/react"
import { useSession } from 'next-auth/react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const LoginForm = () => {

  const [ eyeOpen, setEyeOpen ] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginFormValues>()

  const renderEye = () => {
    if(eyeOpen) {
        return <FaRegEye />
    } else {
        return <FaRegEyeSlash />
    }
  }

  const toggleEye = (event: any) => {
    event.preventDefault()
    setEyeOpen(!eyeOpen)
  }

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    signIn('credentials', {
        email: data.email, 
        password: data.password, 
        redirect: true,
        callbackUrl: process.env["NEXT_PUBLIC_SIGN_IN_CALLBACK_URL"]
    })
  }

  return (
    <form className='bg-primary50 m-8 p-4 rounded w-4/5 tablet:w-3/5 desktop:w-1/2 max-w-xl' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-[32px] font-bold font-sans text-secondary500 text-center'>Welcome Back</h1>
        <p className='text-base text-normal text-secondary500 text-center font-sans'>Please log in to continue</p>
        <div className='my-2'>
            <label className=''>Email Address</label>
            <input className='w-full rounded p-1' {...register("email", { required: true })}></input>
        </div>
        <div className='my-2'>
            <label className=''>Password</label>
            <div className='relative'>
                <input className='w-full rounded p-1' type={eyeOpen ? 'text' : 'password'} {...register("password", { required: true })}></input>
                <Button
                    className='absolute top-2 right-2'
                    onClick={toggleEye}
                >
                    {renderEye()}
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
            Log In
        </Button>
        <div id='divider' className='w-full border border-secondary300 my-4'></div>
        <p className='text-base font-normal text-secondary500 text-center m-2 font-sans'>Or log in with:</p>
        <div className='flex flex-col gap-2 tablet:flex-row justify-evenly'>
            <Button
                className='border-2 border-primary500 text-primary500 text-base font-sans font-medium flex-grow rounded'
                onClick={() => signIn('google')}
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
            <p className='text-[14px] text-secondary500 font-normal font-sans'>No account yet?</p>
            <Button
                className='text-[14px] font-sans font-normal text-secondary500'
            >
                Sign Up
            </Button>
        </div>
    </form>
  )
}

export default LoginForm