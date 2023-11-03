'use client'

import React from 'react'
import { FcSearch } from 'react-icons/fc'
import { Button } from '../ui/button'

const SearchForm = ({...props}) => {
  return (
    <form {...props}>
        <input
          id='search-input'
          className='search-input rounded w-full h-[32px]'
        >
        </input>
        <Button
          id='search-button'
          className='absolute h-[32px] top-0 left-0 p-2'
          variant={'ghost'}
        >
          <FcSearch />
        </Button>
    </form>
  )
}

export default SearchForm