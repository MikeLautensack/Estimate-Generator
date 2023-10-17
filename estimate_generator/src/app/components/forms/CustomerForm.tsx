'use client'

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { customerFormProps } from '../../../types/formTypes'
import { Button } from '../ui/button'
import { CustomerForm } from '@/types/customers'

const CustomerForm = (data:CustomerForm) => {
    console.log(data)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<customerFormProps>()

  const onSubmit: SubmitHandler<customerFormProps> = async (formData) => {
    if(data.data != null) {
        const res = await fetch(`http://localhost:3000/api/customers/edit/${data.data.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        console.log(res)
    } else {
        const res = await fetch('http://localhost:3000/api/customers/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        console.log(res)
    }
  }

  useEffect(() =>{
      if(data.data != null) {
        setValue('name', data.data.name as string)
        setValue('address', data.data.address as string)
        setValue('email', data.data.email as string)
        setValue('phone', data.data.phone as string)
      }
  }, [])


  return (
    <form
        className=''
        onSubmit={handleSubmit(onSubmit)}
    >
        <div>
            <label>name</label>
            <input
                {...register("name")}
            ></input>
        </div>
        <div>
            <label>address</label>
            <input
                {...register("address")}
            ></input>
        </div>
        <div>
            <label>email</label>
            <input
                {...register("email")}
            ></input>
        </div>
        <div>
            <label>phone</label>
            <input
                {...register("phone")}
            ></input>
        </div>
        <Button
             className=''
        >
            Submit
        </Button>
    </form>
  )
}

export default CustomerForm