'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import React, { useState,  useEffect } from 'react'
import { LineItemFormFieldProps } from '@/types/estimates'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { formatPriceString } from '@/utils/formatingFunctions'
import { FaTrashAlt } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

const LineItemFormField = ({
    field,
    fields,
    index,
    applyTotal,
    remove
}: LineItemFormFieldProps) => {

  const { register, watch, setValue, getValues, control } = useFormContext()
  const [ amount, setAmount ] = useState(0)

  const calculateAmount = (quantity: number, price: number): number => {
    const result = quantity * price
    setAmount(result)
    return result
  }

  useEffect(() => {
    watch(() => {
      const amount = calculateAmount(watch(`lineItems.${index}.quantity` as const), watch(`lineItems.${index}.price` as const))
    })
    setValue(`lineItems.${index}.amount`, amount)
  }, [watch(`lineItems.${index}.quantity` as const), watch(`lineItems.${index}.price` as const), fields])

  useEffect(() => {
    applyTotal()
  }, [watch(`lineItems.${index}.amount` as const)])

  useEffect(() => {
    const value = getValues(`lineItems.${index}.rateType`)
    if(value === 'flat') {
      setValue(`lineItems.${index}.quantity`, 1)
    }
  }, [watch(`lineItems.${index}.rateType` as const)])

  return (
    <TableRow className=''>
      <TableCell className="">
        <div className='flex flex-col'>
          <label>Item</label>
          <input {...register(`lineItems.${index}.item` as const)}></input>
        </div>
        <div className='flex flex-col'>
          <label>Description</label>
          <textarea {...register(`lineItems.${index}.description` as const)}></textarea>
        </div>
      </TableCell>
      <TableCell className="flex flex-col">
        <div className={`${getValues(`lineItems.${index}.rateType`) === 'flat' ? 'hidden' : 'flex'}`}>
          <label>Quantity</label>
          <input type='number' {...register(`lineItems.${index}.quantity` as const, {valueAsNumber: true})}></input>
        </div>
      </TableCell>
      <TableCell className="">
        <div>
          <div>
            <FormField
              control={control}
              name={`lineItems.${index}.rateType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate Type</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange} {...register(`lineItems.${index}.rateType` as const)}>
                      <FormControl>                        
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Rate Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="unit">Unit Rate</SelectItem>
                        <SelectItem value="sqft">SQFT</SelectItem>
                        <SelectItem value="lnft">LNFT</SelectItem>
                        <SelectItem value="hour">Hourly</SelectItem>
                        <SelectItem value="day">Dayly</SelectItem>
                        <SelectItem value="flat">Flat Rate</SelectItem>
                      </SelectContent>
                    </Select>
                </FormItem>
              )}
            />
          </div>
          <div>
            <label>Price</label>
            <input type='number' {...register(`lineItems.${index}.price` as const, {valueAsNumber: true})}></input>
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <p>{formatPriceString(amount)}</p>
      </TableCell>
      <TableCell className="">
        <div>
          <Button
            onClick={() => {
              remove(index)
            }}
            className=''
            variant='ghost'
          >
            <FaTrashAlt className='text-error500'/>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default LineItemFormField