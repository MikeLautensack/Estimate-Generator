import React from 'react'
import Button from './buttonComponents/Button'
import { FaBars } from "react-icons/fa"

export default function Nav() {
  return (
    <nav className='flex justify-between items-center bg-secondary500 h-auto'>
        <h2 className='mx-5 text-primary500 font-medium text-[24px]'>Estimate Generator</h2>
        <div className='hidden tablet:flex gap-2 m-2'>
            <Button
                className='bg-secondary500 border-2 border-accent500 text-accent500 p-1 font-medium font text-base'
            >
                Log In
            </Button>
            <Button
                className='bg-accent500 text-secondary500 p-1 font-medium font text-base'
            >
                Sign Up
            </Button>
        </div>
        <FaBars className='m-5 tablet:hidden text-primary500'/>
    </nav>
  )
}
