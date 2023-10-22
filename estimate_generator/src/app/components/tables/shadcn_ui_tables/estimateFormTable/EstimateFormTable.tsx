'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import { useState } from "react"
import { Input } from "../../../ui/input"
import React from 'react'
import { EstimateFormTableProps } from '../../../../../types/estimates'
import LineItemFormField from "./LineItemFormField"

const EstimateFormTable = ({ 
  fields,
  register
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field: any, index: any) => (
            <LineItemFormField 
              field={field}
              index={index}
              register={register}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default EstimateFormTable
