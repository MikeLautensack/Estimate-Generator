'use client'

import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { customerFormProps } from '../../../types/formTypes'
import { Button } from '../ui/button'

const CustomerForm = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<customerFormProps>()

  const onSubmit: SubmitHandler<customerFormProps> = async (data) => {
    const res = await fetch('http://localhost:3000/api/customers/delete', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
  }

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