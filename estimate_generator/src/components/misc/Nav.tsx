'use client'

import React, { useState } from 'react'
import Button from './Button'
import { FaBars } from "react-icons/fa"
import { motion } from "framer-motion"
import Link from 'next/link'
import { signIn } from "next-auth/react"
import { FaXmark } from "react-icons/fa6"

export default function Nav() {

  const [ open, setOpen ] = useState(false)

  return (
    <motion.nav 
        className={`${open ? 'fixed h-full bg-blue-500 z-20 justify-start items-start p-4' : 'justify-between items-center'} flex h-[52px] w-full`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 1.3 }}
        whileInView={{ opacity: 1 }}
    >
        <h2 className={`mx-5 font-medium text-[24px] text-blue-500 ${open && 'text-white'}`}>Estimate Generator</h2>
        <div className={`hidden tablet:flex gap-2 m-2 ${open && 'flex'}`}>
            <Link
                id='login-button'
                className='text-blue-500 text-base font-medium rounded p-1 w-[70px]'
                href='/login'
                onClick={() => signIn()}
            >
                Log In
            </Link>
            <Link
                id='signup-button'
                className='text-blue-500 text-base font-medium rounded p-1 w-[70px]'
                href='/register'
            >
                Sign Up
            </Link>
        </div>
        <FaBars onClick={() => setOpen(!open)} className={`m-5 tablet:hidden text-primary500 ${open && 'hidden'}`}/>
        <FaXmark onClick={() => setOpen(!open)} className={`m-5 tablet:hidden text-primary500 fixed top-1 right-1 ${!open && 'hidden'}`}/>
    </motion.nav>
  )
}
