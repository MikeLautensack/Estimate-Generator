import React from 'react'
import { FormControl, FormItem, FormLabel } from './ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useFormContext } from 'react-hook-form'
import { EstimateFormPartOneSelectProps } from '@/types/estimates'

const EstimateFormOneSelect = ({
    customers,
    field
}: EstimateFormPartOneSelectProps) => {

  const { register } = useFormContext()

  return (
    <FormItem>
      <FormLabel>Customers</FormLabel>
      <Select {...field} value={field.value} onValueChange={field.onChange} {...register("customer" as const)}>
        <FormControl>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Customers" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {customers.map((customer: any) => (
            <div key={customer.id}>
              <SelectItem value={`${customer.name}`}>{customer.name}</SelectItem>
            </div>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  )
}

export default EstimateFormOneSelect