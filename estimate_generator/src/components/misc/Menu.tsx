'use client'

import Link from 'next/link'
import Button from './Button'
import MenuNav from './MenuNav'
import { BsPerson } from 'react-icons/bs'
import { FcSettings } from 'react-icons/fc'
import { IoMdNotificationsOutline } from 'react-icons/io'
import LogoutButton from './LogoutButton'
import { useState } from 'react'
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
    <div className={`${isOpen ? 'fixed h-screen w-64 flex-col items-center right-0 z-10 gap-4 bg-blue-500' : 'h-14'} flex items-center desktop:h-screen desktop:flex-col justify-between desktop:items-start desktop:gap-6 p-4 desktop:px-6 top-0 desktop:sticky desktop:w-64`}>
        <Button
            className={`${isOpen ? 'absolute top-2 right-2' : 'hidden'} text-secondary500`}
            onClick={() => setIsOpen(!open)}
        >
            <FaTimes />
        </Button>
        <div className={`flex flex-col w-full gap-14`}>
            <div className='flex flex-col gap-4 w-full'>
                <h1 className={`text-xl font-bold ${isOpen ? 'text-white text-center' : ''} text-black desktop:text-center`}>Estimate Generator</h1>
                <nav className={`${isOpen ? 'flex' : 'hidden'} desktop:flex justify-center items-center gap-4 w-full`}>
                    <Link
                        id='profile-button'
                        className='bg-white aspect-square rounded-full p-2'
                        href='/settings/profile'
                    >
                        <BsPerson  className='text-secondary800'/>
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
                    >
                        <IoMdNotificationsOutline  className='text-secondary500'/>
                    </Button>
                </nav>
            </div>
            <MenuNav
                className={`${isOpen ? 'flex gap-4 text-white' : 'hidden'} desktop:gap-2 desktop:flex flex-col text-black`}
            />
        </div>
        <LogoutButton
            className={`${isOpen ? 'flex text-white justify-end items-center gap-1' : 'hidden'} w-full desktop:flex desktop:gap-1 desktop:items-center desktop:justify-end font-medium text-black`}
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

console.log(Menu)

export default Menu
