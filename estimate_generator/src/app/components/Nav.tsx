import React from 'react'
import Button from './Button'
import { FaBars } from "react-icons/fa"
import { motion } from "framer-motion"
import Link from 'next/link'
import { signIn } from "next-auth/react"

export default function Nav() {
  return (
    <motion.nav 
        className='flex justify-between items-center h-[52px] font-sans w-full'
        initial={{ opacity: 0, y: -50 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 1.3 }}
        whileInView={{ opacity: 1 }}
    >
        <h2 className='mx-5 text-primary500 font-medium text-[24px]'>Estimate Generator</h2>
        <div className='hidden tablet:flex gap-2 m-2'>
            <Link
                id='login-button'
                className='bg-primary500 text-primary100 text-base font-medium rounded p-1 w-[70px]'
                href='/login'
                onClick={() => signIn()}
            >
                Log In
            </Link>
            <Link
                id='signup-button'
                className='text-primary100 text-base font-medium rounded p-1 border-2 border-primary500 w-[70px]'
                href='/register'
            >
                Sign Up
            </Link>
        </div>
        <FaBars className='m-5 tablet:hidden text-primary500'/>
    </motion.nav>
  )
}
