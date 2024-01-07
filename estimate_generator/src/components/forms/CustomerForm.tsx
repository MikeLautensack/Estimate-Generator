'use client'

import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { customerFormProps } from '../../types/formTypes'
import { Button } from '../ui/button'
import { CustomerForm } from '@/types/customers'
import { useRouter } from 'next/navigation'

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
    try {
        if(data != null) {
            const editCustomer = await fetch(`${process.env["NEXT_PUBLIC_CUSTOMERS_EDIT_URL"]}/${data.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    address: formData.address,
                    email: formData.email,
                    phone: formData.phone,
                })
            })

            const editUser = await fetch(`${process.env["NEXT_PUBLIC_USER_EDIT"]}/${data.customer_user_id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                })
            })

            router.refresh()
            router.push(`${process.env["NEXT_PUBLIC_CUSTOMERS_URL"]}`)
        } else {
    
            const customerUserObject = {
                name: formData.name,
                email: formData.email,
                role: 'customer'
            }
    
            const createCustomerUserObject = await fetch(`${process.env["NEXT_PUBLIC_USER_CREATE"]}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customerUserObject)
            }) 
            
            const data = await createCustomerUserObject.json()
            
            const customerObject = {
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                customer_user_id: data.newUser[0].id,
            }
    
            const createCustomerObject = await fetch(`${process.env["NEXT_PUBLIC_CUSTOMERS_CREATE_URL"]}`, {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(customerObject)
            }) 
    
            router.refresh()
            router.push(`${process.env["NEXT_PUBLIC_CUSTOMERS_URL"]}`)
        }
    } catch (error) {
        console.log(error)
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
        className='bg-neutral100 rounded-lg p-4 flex flex-col gap-2 w-full mx-4 tablet:w-1/2'
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className='flex flex-col gap-1 border-b border-blue-700'>
            <label>name</label>
            <input
                {...register("name")}
            ></input>
        </div>
        <div className='flex flex-col gap-1 border-b border-blue-700'>
            <label>address</label>
            <input
                {...register("address")}
            ></input>
        </div>
        <div className='flex flex-col gap-1 border-b border-blue-700'>
            <label>email</label>
            <input
                {...register("email")}
            ></input>
        </div>
        <div className='flex flex-col gap-1 border-b border-blue-700'>
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