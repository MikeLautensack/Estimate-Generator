'use client'

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
import { EstimateFormOneProps, EstimateFormOneValues } from '@/types/estimates'
import { Button } from '../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
  

const EstimateFormOne = ({
    customers
}:EstimateFormOneProps) => {

    const {
      register,
      handleSubmit,
      watch,
      control,
      formState: { errors },
    } = useForm<EstimateFormOneValues>()


    const onSubmit: SubmitHandler<EstimateFormOneValues> = (data) => {
      
    }

  return (
    <form>
        <div>
            <h1>Customer Details</h1>
            <div>
                <Select {...register("customers")}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                        <SelectItem value={customer.name as string}>{customer.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
        </div>
        <div>
            <label>Name</label>
            <input {...register("name")}></input>
        </div>
        <div>
            <label>Email</label>
            <input {...register("email")}></input>
        </div>
        <div>
            <label>Phone</label>
            <input {...register("phone")}></input>
        </div>
        <div>
            <label>Address</label>
            <input {...register("address")}></input>
        </div>
        <Button
            type='submit'
        >
            Save
        </Button>
    </form>
  )
}

export default EstimateFormOne