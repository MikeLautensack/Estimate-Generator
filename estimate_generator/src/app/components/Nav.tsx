import React from 'react'
import Button from './Button'
import { FaBars } from "react-icons/fa"
import { motion } from "framer-motion"

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
            <Button
                className='bg-primary500 text-primary100 text-base font-medium rounded p-1 w-[70px]'
            >
                Log In
            </Button>
            <Button
                className='text-primary100 text-base font-medium rounded p-1 border-2 border-primary500 w-[70px]'
            >
                Sign Up
            </Button>
        </div>
        <FaBars className='m-5 tablet:hidden text-primary500'/>
    </motion.nav>
  )
}
