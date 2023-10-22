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
          />
        </TabsContent>
        <TabsContent
            value='estimate-form-two'
        >
          <EstimateFormTwo />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EstimateForms