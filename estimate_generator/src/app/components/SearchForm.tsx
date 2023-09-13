'use client'

import React from 'react'
import { FcSearch } from 'react-icons/fc'
import { Button } from './ui/button'

const SearchForm = () => {
  return (
    <form className='flex rounded p-2 relative'>
        <input
          id='search-input'
          className='search-input rounded'
        >
        </input>
        <Button
          id='search-button'
          className='absolute left-2 m-0 p-0'
          variant={'ghost'}
        >
          <FcSearch />
        </Button>
    </form>
  )
}

export default SearchForm