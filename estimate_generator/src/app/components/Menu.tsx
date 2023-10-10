'use client'

import Link from 'next/link'
import Button from './Button'
import MenuNav from './MenuNav'
import MenuSearch from './MenuSearch'
import { BsPerson } from 'react-icons/bs'
import { FcSettings } from 'react-icons/fc'
import { IoMdNotificationsOutline } from 'react-icons/io'
import LogoutButton from './LogoutButton'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'

const Menu = () => {

 const [ open, setOpen ] = useState(false)

 return (
    <div className='flex gap-4 w-full bg-primary100 p-4'>
        <h1 className='text-2xl font-bold font-sans text-primary500'>Estimate Generator</h1>
        <nav className='flex gap-4 justify-center items-center'>
            <Link
                id='profile-button'
                className='bg-primary200 aspect-square rounded-full p-2'
                href='/settings/profile'
            >
                <BsPerson className='text-primary300'/>
            </Link>
            <Link
                id='settings-button'
                className=''
                href='/settings/account'
            >
                <FcSettings />
            </Link>
            <Button
                id='notifications-button'
                className=''
            >
                <IoMdNotificationsOutline />
            </Button>
        </nav>
        <MenuSearch
            className='hidden'
        />
        <MenuNav
            className={`${open ? 'flex' : 'hidden'} desktop:flex flex-col items-start gap-2`}
        />
        <LogoutButton
            className={`${open ? 'flex' : 'hidden'} desktop:flex`}
        />
        <Button
            className={`${open ? 'hidden' : 'flex'} desktop:hidden`}
            onClick={() => setOpen(!open)}
        >
            <FaBars />
        </Button>
    </div>
  )
}

export default Menu
