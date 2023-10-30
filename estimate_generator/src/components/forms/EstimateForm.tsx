'use client'

import React, { useState } from 'react'
import { EstimateFormProps, EstimateFormValues } from '@/types/estimates'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import EstimateFormPartOne from './EstimateFormPartOne'
import EstimateFormPartTwo from './EstimateFormPartTwo'
import { Card, CardContent } from '../ui/card'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

const EstimateForm = ({
  customers
}:EstimateFormProps) => {

  const methods = useForm<EstimateFormValues>({
    defaultValues: {
        lineItems: [{
            item: '',
            description: '',
            quantity: null,
            rateType: 'unit',
            price: null,
            amount: 0
        }],
        taxRate: 0
    }
  })

  const onSubmit: SubmitHandler<EstimateFormValues> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Tabs
            defaultValue={'estimate-form-one'}
            className=''
          >
            <TabsList>
                <TabsTrigger value='estimate-form-one'>1. Customer & Contact Info</TabsTrigger>
                <TabsTrigger value='estimate-form-two'>2. Estimate Info</TabsTrigger>
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
              <Card>
                <CardContent>
                  <EstimateFormPartTwo />
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