'use client'

import React from 'react'
import Button from './Button'
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsFilePerson } from 'react-icons/bs'
import { FcDocument } from 'react-icons/fc'
import Link from 'next/link'

const MenuNav = ({ ...props }) => {
  return (
    <nav 
        {...props}
    >
        <Link
            id='dashboard-button'
            className='text-base font-medium font-sans text-primary500 flex gap-2 items-center'
            href='/contractor-dashboard'
        >
            <LuLayoutDashboard />
            Dashboard
        </Link>
        <Link
            id='customers-button'
            className='text-base font-medium font-sans text-primary500 flex gap-2 items-center'
            href='/contractor-dashboard/customers'
        >
            <BsFilePerson />
            Customers
        </Link>
        <Link
            id='estimates-button'
            className='text-base font-medium font-sans text-primary500 flex gap-2 items-center'
            href='/contractor-dashboard/estimates'
        >
            <FcDocument />
            Estimates
        </Link>
        <Link
            id='estimates-button'
            className='text-base font-medium font-sans text-primary500 flex gap-2 items-center'
            href='/contractor-dashboard/change-orders'
        >
            <FcDocument />
            Change Orders
        </Link>
    </nav>
  )
}

export default MenuNav