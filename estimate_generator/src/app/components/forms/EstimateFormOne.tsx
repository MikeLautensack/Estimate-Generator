'use client'

import React, { useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { EstimateFormOneProps, EstimateFormOneValues } from '@/types/estimates'
import { Button } from '../ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'

const EstimateFormOne = ({
    customers,
    setFormOneData,
}:EstimateFormOneProps) => {

    const methods = useForm<EstimateFormOneValues>()


    const onSubmit: SubmitHandler<EstimateFormOneValues> = (data) => {
      if(methods.getValues('customer') == undefined) {
        setFormOneData({
          customer: {
            id: 0,
            name: '',
            address: '',
            email: '',
            phone: '',
            user_id: 0
          },
          name: data.name,
          email: data.email,
          address: data.address
        })
      } else {
        setFormOneData({
          customer: {
            id: data.customer.id,
            name: data.customer.name,
            address: data.customer.address,
            email: data.customer.address,
            phone: data.customer.phone,
            user_id: data.customer.user_id
          },
          name: '',
          email: '',
          address: ''
        })
      }
    }

    useEffect(() => {
      if(methods.getValues('customer') !== undefined) {
        methods.setValue('address', '')
        methods.setValue('email', '')
        methods.setValue('name', '')
      }
    },[methods.watch('customer')])

  return (
    <Form {...methods}>
      <form  onSubmit={methods.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={methods.control}
            name="customer"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormItem>
                <FormLabel>Customers</FormLabel>
                <FormControl>
                  <Select value={value} onValueChange={onChange} {...methods.register("customer")}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Customers" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                          <SelectItem value={customer.name as string}>{customer.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className={`${methods.getValues('customer') !== undefined ? 'hidden' : 'flex'}`}>
          <div>
              <label>Name</label>
              <input {...methods.register("name")}></input>
          </div>
          <div>
              <label>Email</label>
              <input {...methods.register("email")}></input>
          </div>
          <div>
              <label>Address</label>
              <input {...methods.register("address")}></input>
          </div>
        </div>
        <Button
            type='submit'
        >
            Save
        </Button>
      </form>
    </Form>
  )
}

export default EstimateFormOne