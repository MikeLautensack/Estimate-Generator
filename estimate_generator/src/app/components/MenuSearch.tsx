'use client'

import React from 'react'
import { useState } from 'react'
import SearchForm from './forms/SearchForm'

const MenuSearch = () => {

  const [ serachQuery, setSearchQuery ] = useState('')

  return (
    <div className='w-full'>
        <SearchForm />
    </div>
  )
}

export default MenuSearch