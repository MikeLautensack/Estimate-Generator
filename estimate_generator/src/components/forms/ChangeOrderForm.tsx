'use client'

import React, { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { ChangeOrderFormProps, ChangeOrderForm } from '@/types/changeOrders'

const ChangeOrderForm = (data: ChangeOrderForm) => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ChangeOrderFormProps>()

  const onSubmit: SubmitHandler<ChangeOrderFormProps> = async (formData) => {
    try {
      if(data.data?.mode == 'put') {
        const editChangeOrder = await fetch(`${process.env["NEXT_PUBLIC_CHANGE_ORDERS_EDIT"]}/${data.data?.change_order_id}}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              changeOrderName: formData.changeOrderName,
              description: formData.description,
          })
        })
        const updateEstimateStatus = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_UPDATE_STATUS"]}/${data.data.estimate_id}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: 'Change Order Requested (edited)'
          })
        })
      } else if (data.data?.mode == 'post') {
        const createChangeOrder = await fetch(`${process.env["NEXT_PUBLIC_CHANGE_ORDERS_CREATE"]}`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              changeOrderName: formData.changeOrderName,
              description: formData.description,
              estimateName: data.data?.estimateName,
              customerName: data.data?.customerName,
              projectAddress: data.data?.projectAddress,
              contractor_user_id: data.data?.contractor_user_id,
              customer_user_id: data.data.customer_user_id,
              estimate_id: data.data.estimate_id
          })
        })
        const updateEstimateStatus = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_UPDATE_STATUS"]}/${data.data.estimate_id}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: 'Change Order Requested'
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
        className=''
        onSubmit={handleSubmit(onSubmit)}
    >
        <div className=''>
          <label>Change Order Name</label>
          <input {...register("changeOrderName")}></input>
        </div>
        <div className=''>
          <label>Change Order Description</label>
          <textarea {...register("description")}></textarea>
        </div>
        <Button
          onClick={() => {

          }}
          className=''
        >
          Submit Change Order
        </Button>
    </form>
  )
}

export default ChangeOrderForm