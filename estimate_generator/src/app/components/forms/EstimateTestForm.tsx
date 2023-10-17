'use client'

import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { customerFormProps } from '../../../types/formTypes'
import { Button } from '../ui/button'

const EstimateTestForm = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<customerFormProps>()

  const onSubmit: SubmitHandler<customerFormProps> = async (data) => {
    const id = Math.floor(Math.random() * 100000000)
    const testEstimate = {
        id: id,
        estimateName: 'test',
        customerName: 'test',
        customerBusinessName: 'name',
        projectAddress: 'address',
        contractorName: 'name',
        contractorAddress: 'address',
        contractorPhone: 'phone',
        lineItems: [
            {
                id: Math.floor(Math.random() * 100000000),
                description: 'description',
                quantity:  Math.floor(Math.random() * 10),
                rateType: 'rt',
                unitType: 'ut',
                unitRate: 5.00,
                total: 50.00,
                estimate_id: id
            },
            {
                id: Math.floor(Math.random() * 100000000),
                description: 'description',
                quantity:  Math.floor(Math.random() * 10),
                rateType: 'rt',
                unitType: 'ut',
                unitRate: 5.00,
                total: 50.00,
                estimate_id: id
            },
            {
                id: Math.floor(Math.random() * 100000000),
                description: 'description',
                quantity:  Math.floor(Math.random() * 10),
                rateType: 'rt',
                unitType: 'ut',
                unitRate: 5.00,
                total: 50.00,
                estimate_id: id
            },
            {
                id: Math.floor(Math.random() * 100000000),
                description: 'description',
                quantity:  Math.floor(Math.random() * 10),
                rateType: 'rt',
                unitType: 'ut',
                unitRate: 5.00,
                total: 50.00,
                estimate_id: id
            },
            {
                id: Math.floor(Math.random() * 100000000),
                description: 'description',
                quantity:  Math.floor(Math.random() * 10),
                rateType: 'rt',
                unitType: 'ut',
                unitRate: 5.00,
                total: 50.00,
                estimate_id: id
            },
            {
                id: Math.floor(Math.random() * 100000000),
                description: 'description',
                quantity:  Math.floor(Math.random() * 10),
                rateType: 'rt',
                unitType: 'ut',
                unitRate: 5.00,
                total: 50.00,
                estimate_id: id
            },
        ],
        massage: 'message',
        subtotal: 92.00,
        tax: 8,
        total: 100.00,
        user_id: Math.floor(Math.random() * 100000000)
    }

    const res = await fetch('http://localhost:3000/api/estimates/create', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(testEstimate)
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
        <Button
             className=''
        >
            Submit
        </Button>
    </form>
  )
}

export default EstimateTestForm