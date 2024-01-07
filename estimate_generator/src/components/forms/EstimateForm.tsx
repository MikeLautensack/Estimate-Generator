'use client'

import React, { useEffect, useState } from 'react'
import { EstimateFormProps, EstimateFormValues } from '@/types/estimates'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import EstimateFormPartOne from './EstimateFormPartOne'
import EstimateFormPartTwo from './EstimateFormPartTwo'
import { Card, CardContent } from '../ui/card'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Customers } from '@/types/customers'
import { ChangeOrders } from '@/types/changeOrders'
import ChangeOrderRequests from '../misc/ChangeOrderRequests'

const EstimateForm = ({
  estimate,
  customers,
  profile,
  changeOrders
}:EstimateFormProps) => {
  
  const [ lineItems, setLineItems ] = useState([{
    item: '',
    description: '',
    quantity: null,
    rateType: 'unit',
    price: null,
    amount: 0
  }])

  const methods = useForm<EstimateFormValues>({
    defaultValues: {
        lineItems: lineItems,
        taxRate: 0
    }
  })

  const control = methods.control
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: 'lineItems'
  })

  const getCustomerUserID = (customers: Customers[], id: number) => {
    for(let i = 0; i < customers.length; i++) {
      if(customers[i].id == id) {
        return customers[i].customer_user_id
      }
    }
  }

  const onSubmit: SubmitHandler<EstimateFormValues> = async (data) => {
    console.log(data)
    const customer_user_id = getCustomerUserID(customers, data.customer_id as number)
    if(estimate) {
      const res = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_EDIT_URL"]}/${estimate.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          status: 'Work In Progress (edited)'
        })
      })
    } else {
      const res = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_CREATE_URL"]}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          customer_user_id,
          status: 'Work In Progress'
        })
      })
    }
  }

  const createArray = (changeOrders: ChangeOrders[]): ChangeOrders[] => {
    const arr = sortChangeOrders(changeOrders)
    const array = arr.filter(order => {
      if (order.status == 'Pending Approval') {
        return true
      } else if (order.status == 'Saved For Later') {
        return true
      } else {
        return false
      }
    })
    return array
  }

  const sortChangeOrders = (changeOrders: ChangeOrders[]): ChangeOrders[] => {
    return changeOrders.sort((a, b) => b.dateUpdated!.getTime() - a.dateUpdated!.getTime())
  }

  useEffect(() => {
    if(estimate) {
      setLineItems(estimate.lineItems)
      methods.setValue('estimateName', estimate.estimateName)
      methods.setValue('customer_id', estimate.customer_id)
      methods.setValue('customerName', estimate.customerName)
      methods.setValue('customerEmail', estimate.customerEmail)
      methods.setValue('projectAddress', estimate.projectAddress)
      methods.setValue('contractorName', estimate.contractorName)
      methods.setValue('contractorAddress', estimate.contractorAddress)
      methods.setValue('contractorPhone', estimate.contractorPhone)
      methods.setValue('lineItems', estimate.lineItems)
      methods.setValue('taxRate', estimate.taxRate)
      methods.setValue('message', estimate.message)
      methods.setValue('subtotal', estimate.subtotal)
      methods.setValue('tax', estimate.tax)
      methods.setValue('total', estimate.total)
      for(let i = 0; i < estimate.lineItems.length; i++) {
        methods.setValue(`lineItems.${i}.item`, estimate.lineItems[i].item)
        methods.setValue(`lineItems.${i}.description`, estimate.lineItems[i].description)
        methods.setValue(`lineItems.${i}.rateType`, estimate.lineItems[i].rateType)
        methods.setValue(`lineItems.${i}.quantity`, estimate.lineItems[i].quantity)
        methods.setValue(`lineItems.${i}.price`, estimate.lineItems[i].price)
        methods.setValue(`lineItems.${i}.amount`, estimate.lineItems[i].amount)
      }
    }
  }, [])

  const checkChangeOrders = (orders: ChangeOrders[]): boolean => {
    if (!orders || orders.length === 0) {
      return false;
    }
    if (!orders.some(order => order.status === 'Pending Approval' || order.status === 'Saved For Later')) {
      return false;
    }
    return true;
  }

  return (
    <div className='w-full'>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='w-full'
        >
          
          <Tabs
            defaultValue={'estimate-form-two'}
            className='w-full'
          >
            <TabsList className='w-full flex'>
                <TabsTrigger className='flex-1' value='estimate-form-one'>1. Customer & Contact Info</TabsTrigger>
                <TabsTrigger className='flex-1' value='estimate-form-two'>2. Estimate Info</TabsTrigger>
            </TabsList>
            <TabsContent
                value='estimate-form-one'
                className=''
            >
              <EstimateFormPartOne
                customers={customers}
              /> 
            </TabsContent>
            <TabsContent
                value='estimate-form-two'
                className=''
            >
              {/* {checkChangeOrders(changeOrders) ? <ChangeOrderRequests changeOrders={createArray(changeOrders)} /> : <></>} */}
              <EstimateFormPartTwo
                customers={customers} 
                profile={profile}
                fields={fields}
                prepend={prepend}
                remove={remove}
                changeOrders={changeOrders}
                estimate={estimate}
              />
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  )
}

export default EstimateForm