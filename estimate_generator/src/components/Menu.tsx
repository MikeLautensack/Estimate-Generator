'use client'

import Link from 'next/link'
import Button from './Button'
import MenuNav from './MenuNav'
import MenuSearch from './MenuSearch'
import { BsPerson } from 'react-icons/bs'
import { FcSettings } from 'react-icons/fc'
import { IoMdNotificationsOutline } from 'react-icons/io'
import LogoutButton from './LogoutButton'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'

const Menu = () => {

 const [ isOpen, setIsOpen ] = useState(false)
 const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)'
  })

  const close = () => {
      if (isDesktop && isOpen) {
        setIsOpen(false)
      }
  }
  close()

 return (
    <div className={`${isOpen ? 'fixed h-screen w-full max-w-sm flex-col justify-start items-center right-0 top-0 z-10 gap-4' : 'justify-between h-14 p-4'} flex items-center w-full bg-primary100 desktop:h-screen desktop:max-w-sm desktop:flex-col desktop:justify-start desktop:items-start desktop:gap-6`}>
        <Button
            className={`${isOpen ? 'absolute top-4 right-4' : 'hidden'}`}
            onClick={() => setIsOpen(!open)}
        >
            <FaTimes />
        </Button>
        <h1 className='text-2xl font-bold font-sans text-primary500'>Estimate Generator</h1>
        <nav className={`${isOpen ? 'flex' : 'hidden'} desktop:flex justify-center items-center gap-4 w-full`}>
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
            className={`${isOpen ? 'flex' : 'hidden'} desktop:flex`}
        />
        <MenuNav
            className={`${isOpen ? 'flex gap-2' : 'hidden'} desktop:gap-2 desktop:flex flex-col`}
        />
        <LogoutButton
            className={`${isOpen ? 'flex' : 'hidden'} desktop:flex`}
        />
        <Button
            className={`${isOpen ? 'hidden' : 'flex'} desktop:hidden`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <FaBars />
        </Button>
    </div>
  )
}

export default Menu
