'use client'

import React, { useEffect, useState } from 'react'
import { EstimateFormProps, EstimateFormValues, LineItems } from '@/types/estimates'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import EstimateFormPartOne from './EstimateFormPartOne'
import EstimateFormPartTwo from './EstimateFormPartTwo'
import { Card, CardContent } from '../ui/card'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Customers } from '@/types/customers'

const EstimateForm = ({
  estimate,
  customers,
  profile
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
    const customer_user_id = getCustomerUserID(customers, data.customer_id as number)
    if(estimate) {
      const res = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_EDIT_URL"]}/${estimate.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    } else {
      const res = await fetch(`${process.env["NEXT_PUBLIC_ESTIMATES_CREATE_URL"]}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...data,
          customer_user_id
        })
      })
    }
  }

  useEffect(() => {
    console.log('useEffect firing .....')
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
      for(let i = 0; i < estimate.lineItems.length; i++) {
        methods.setValue(`lineItems.${i}.item`, estimate.lineItems[i].item)
        methods.setValue(`lineItems.${i}.description`, estimate.lineItems[i].description)
        methods.setValue(`lineItems.${i}.rateType`, estimate.lineItems[i].rateType)
        methods.setValue(`lineItems.${i}.quantity`, estimate.lineItems[i].quantity)
        methods.setValue(`lineItems.${i}.price`, estimate.lineItems[i].price)
        methods.setValue(`lineItems.${i}.amount`, estimate.lineItems[i].amount)
      }
      methods.setValue('taxRate', estimate.taxRate)
      methods.setValue('message', estimate.message)
      methods.setValue('subtotal', estimate.subtotal)
      methods.setValue('tax', estimate.tax)
      methods.setValue('total', estimate.total)
    }
  }, [])

  return (
    <div className='border border-primary700 w-full h-full'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Tabs
            defaultValue={'estimate-form-one'}
            className=''
          >
            <TabsList className='w-full flex'>
                <TabsTrigger className='flex-1' value='estimate-form-one'>1. Customer & Contact Info</TabsTrigger>
                <TabsTrigger className='flex-1' value='estimate-form-two'>2. Estimate Info</TabsTrigger>
            </TabsList>
            <TabsContent
                value='estimate-form-one'
            >
              <Card>
                <CardContent>
                  <EstimateFormPartOne
                    customers={customers}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
                value='estimate-form-two'
            >
              <Card className='bg-primary100'>
                <CardContent>
                  <EstimateFormPartTwo
                    customers={customers} 
                    profile={profile}
                    fields={fields}
                    prepend={prepend}
                    remove={remove}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </FormProvider>
    </div>
  )
}

export default EstimateForm