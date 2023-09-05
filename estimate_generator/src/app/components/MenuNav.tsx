'use client'

import React from 'react'
import Button from './Button'
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsFilePerson } from 'react-icons/bs'
import { FcDocument } from 'react-icons/fc'

const MenuNav = () => {
  return (
    <nav className='w-full flex flex-col items-start gap-2'>
        <Button
            id='dashboard-button'
            className='text-base font-medium font-sans text-primary500 flex gap-2 items-center'
        >
            <LuLayoutDashboard />
            Dashboard
        </Button>
        <Button
            id='customers-button'
            className='text-base font-medium font-sans text-primary500 flex gap-2 items-center'
        >
            <BsFilePerson />
            Customers
        </Button>
        <Button
            id='estimates-button'
            className='text-base font-medium font-sans text-primary500 flex gap-2 items-center'
        >
            <FcDocument />
            Estimates
        </Button>
    </nav>
  )
}

export default MenuNav