'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React from 'react'
import { EstimateFormTableProps } from '../../../../types/estimates'
import LineItemFormField from "../../../forms/LineItemFormField"

const EstimateFormTable = ({ 
  fields,
  applyTotal,
  remove
}: EstimateFormTableProps) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((
            field: any, 
            index: any
          ) => (
            <LineItemFormField 
              key={field.id}
              field={field}
              fields={fields}
              index={index}
              applyTotal={applyTotal}
              remove={remove}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default EstimateFormTable
