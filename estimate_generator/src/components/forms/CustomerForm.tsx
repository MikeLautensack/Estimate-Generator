'use client'

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { customerFormProps } from '../../types/formTypes'
import { Button } from '../ui/button'
import { CustomerForm } from '@/types/customers'
import { useRouter } from 'next/navigation'
import { addCustomer, editCustomer } from '@/actions/customerActions'
import { generatePassword } from '@/utils/generateRandom'

const CustomerForm = ({data}: CustomerForm) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<customerFormProps>()

  const router = useRouter()

  const onSubmit: SubmitHandler<customerFormProps> = async (formData) => {
    if(data != null) {
        editCustomer({
            id: data.id,
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            customer_user_id: data.customer_user_id
        })
        router.refresh()
        router.push(`${process.env["NEXT_PUBLIC_CUSTOMERS_URL"]}`)
    } else {
        const ID = Math.floor(Math.random() * 100000000)
        addCustomer({
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            customer_user_id: ID.toString()
        },
        {
            id: ID.toString(),
            name: formData.name,
            email: formData.email,
            role: 'customer'
        },)
        router.refresh()
        router.push(`${process.env["NEXT_PUBLIC_CUSTOMERS_URL"]}`)
    }
  }

  useEffect(() =>{
      if(data != null) {
        setValue('name', data.name as string)
        setValue('address', data.address as string)
        setValue('email', data.email as string)
        setValue('phone', data.phone as string)
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