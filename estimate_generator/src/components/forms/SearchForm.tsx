import React from 'react'
import Button from '../Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SideMenuSearchFormProps } from '../../types/types'
import { FiSearch } from 'react-icons/fi'

const SearchForm = ({}) => {

  const {
    register,
    handleSubmit
  } = useForm<SideMenuSearchFormProps>()

  const onSubmit: SubmitHandler<SideMenuSearchFormProps> = (data) => {
    
  }

  return (
    <form className='w-full flex justify-center items-stretch' onSubmit={handleSubmit(onSubmit)}>
        <Button
            className='flex items-center aspect-square bg-primary50'
        >
            <FiSearch className='text-primary300'/>
        </Button>
        <input className='flex-grow bg-primary50' {...register("search")}></input>
    </form>
  )
}

export default SearchForm