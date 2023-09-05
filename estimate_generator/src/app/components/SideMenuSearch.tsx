'use client'

import React from 'react'
import { useState } from 'react'
import SideMenuSearchForm from './forms/SideMenuSearchForm'

const SideMenuSearch = () => {

  const [ serachQuery, setSearchQuery ] = useState('')

  return (
    <div className='w-full'>
        <SideMenuSearchForm />
    </div>
  )
}

export default SideMenuSearch