'use client'

import React, { useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { EstimateFormPartOneProps, EstimateFormPartOneValues } from '@/types/estimates'
import { Button } from '../ui/button'
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import EstimateFormOneSelect from '../EstimateFormOneSelect'

const EstimateFormPartOne = ({
    customers
}:EstimateFormPartOneProps) => {

  const { register, watch, setValue, getValues, control } = useFormContext()


    useEffect(() => {
      if(getValues('customer') !== undefined) {
        setValue('address', '')
        setValue('email', '')
        setValue('name', '')
      }
    },[watch('customer')])

  return (
    <div>
      <div>
        <FormField
          control={control}
          name={"customer"}
          render={({ field }) => (
            <EstimateFormOneSelect
              customers={customers} 
              field={field}
            />
          )}
        />
      </div>
      <div className={`${getValues('customer') !== undefined ? 'hidden' : 'flex'}`}>
        <div>
            <label>Name</label>
            <input {...register("name")}></input>
        </div>
        <div>
            <label>Email</label>
            <input {...register("email")}></input>
        </div>
        <div>
            <label>Address</label>
            <input {...register("address")}></input>
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