'use client'

import React, { useState } from 'react'
import { EstimateFormsProps } from '@/types/estimates'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import EstimateFormOne from '../../forms/EstimateFormOne'
import EstimateFormTwo from '../../forms/EstimateFormTwo'

const EstimateForms = ({
  customers
}:EstimateFormsProps) => {

  const [ isAddMode, setIsAddMode ] = useState(true)
  const [ formOneData, setFormOneData ] = useState({
    customer: {
      id: 0,
      name: '',
      address: '',
      email: '',
      phone: '',
      user_id: 0
    },
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  return (
    <div>
      <Tabs
        defaultValue={`${isAddMode ? 'estimate-form-one' : 'estimate-form-two'}`}
        className=''
      >
        <TabsList>
            <TabsTrigger value='estimate-form-one'>1. Customer & Contact Info</TabsTrigger>
            <TabsTrigger value='estimate-form-two'>2. Estimate Info</TabsTrigger>
        </TabsList>
        <TabsContent
            value='estimate-form-one'
        >
          <EstimateFormOne
            customers={customers}
            setFormOneData={setFormOneData} 
          />
        </TabsContent>
        <TabsContent
            value='estimate-form-two'
        >
          <EstimateFormTwo
            formOneData={formOneData} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EstimateForms