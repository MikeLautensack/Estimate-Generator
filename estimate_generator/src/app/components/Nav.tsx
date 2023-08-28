import React from 'react'
import Button from './buttonComponents/Button'
import { FaBars } from "react-icons/fa"

export default function Nav() {
  return (
    <nav className='flex justify-between items-center bg-primary100 h-[52px] font-sans'>
        <h2 className='mx-5 text-primary500 font-medium text-[24px]'>Estimate Generator</h2>
        <div className='hidden tablet:flex gap-2 m-2'>
            <Button
                className='bg-primary500 text-primary100 text-base font-medium rounded p-1 w-[70px]'
            >
                Log In
            </Button>
            <Button
                className='bg-primary100 text-primary500 text-base font-medium rounded p-1 border-2 border-primary500 w-[70px]'
            >
                Sign Up
            </Button>
        </div>
        <FaBars className='m-5 tablet:hidden text-primary500'/>
    </nav>
  )
}
