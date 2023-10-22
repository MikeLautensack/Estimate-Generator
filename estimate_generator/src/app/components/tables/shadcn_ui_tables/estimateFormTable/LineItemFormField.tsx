'use client'

import { TableCell, TableRow } from '@/app/components/ui/table'
import React from 'react'
import { LineItemFormFieldProps } from '@/types/estimates'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'

const LineItemFormField = ({
    field,
    index,
    register
}: LineItemFormFieldProps) => {
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
        <label>Quantity</label>
        <input {...register(`lineItems.${index}.quantity` as const)}></input>
      </TableCell>
      <TableCell className="">
        <div>
          <div>
            <label>Rate Type</label>
            <Select {...register(`lineItems.${index}.rateType` as const)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rate Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="flat">Unit</SelectItem>
                <SelectItem value="unit">SQFT</SelectItem>
                <SelectItem value="unit">LNFT</SelectItem>
                <SelectItem value="unit">Hour</SelectItem>
                <SelectItem value="time">Day</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Price</label>
            <input {...register(`lineItems.${index}.price` as const)}></input>
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <p></p>
      </TableCell>
    </TableRow>
  )
}

export default LineItemFormField