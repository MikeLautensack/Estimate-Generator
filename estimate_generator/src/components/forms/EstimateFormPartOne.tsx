'use client'

import React, { useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { EstimateFormPartOneProps } from '@/types/estimates'
import { Button } from '../ui/button'
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import EstimateFormOneSelect from '../misc/EstimateFormOneSelect'

const EstimateFormPartOne = ({
    customers
}:EstimateFormPartOneProps) => {

  const { register, watch, setValue, getValues, control } = useFormContext()

  useEffect(() => {
    if(getValues('customer_id')) {
      for(let i = 0; i < customers.length; i++) {
        if(getValues('customer_id') == customers[i].id) {
          
        }
      }
    }
  },[watch('customer')])

  return (
    <div>
      <div>
        <FormField
          control={control}
          name={"customer_id"}
          render={({ field }) => (
            <EstimateFormOneSelect
              customers={customers} 
              field={field}
            />
          )}
        />
      </div>
      <div className={`${getValues('customer_id') ? 'hidden' : 'flex'} flex-col gap-2 my-2`}>
        <div className='flex flex-col gap-1'>
            <label>Name</label>
            <input {...register("customerName")} className='border border-primary300 rounded'></input>
        </div>
        <div className='flex flex-col gap-1'>
            <label>Email</label>
            <input {...register("customerEmail")} className='border border-primary300 rounded'></input>
        </div>
        <div className='flex flex-col gap-1'>
            <label>Address</label>
            <input {...register("projectAddress")} className='border border-primary300 rounded'></input>
        </div>
      </div>
      <Button
          type='submit'
      >
          Save
      </Button>
    </div>
  )
}

export default EstimateFormPartOne