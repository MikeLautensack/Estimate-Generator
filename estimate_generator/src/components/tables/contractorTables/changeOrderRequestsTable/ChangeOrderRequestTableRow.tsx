'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { ChangeOrderRequestRowProps } from '@/types/changeOrders'
import React, { useEffect, useState } from 'react'

const ChangeOrderRequestTableRow = ({ 
  orderRequest, 
  setOrdersSelectedState,
  ordersSelectedState,
  id
}: ChangeOrderRequestRowProps) => {

  const [ selectedState, setSelectedState ] = useState(false)

  useEffect(() => {
    console.log('useEffect [] child', {selectedState: selectedState, id: id})
  }, [selectedState])

  useEffect(() => {
    for (const key in ordersSelectedState) {
      if (parseInt(key) == id) {
        setSelectedState(true)
      } else {
        setSelectedState(false)
      }
    }
    console.log('selected state',selectedState)
  }, [ordersSelectedState])

  const handleOnClick = () => {
    let obj = {...ordersSelectedState}
    for (const key in obj) {
      if (parseInt(key) == id) {
        obj[key] = true
        setSelectedState(true)
      } else {
        obj[key] = false
      }
    }
    setOrdersSelectedState(obj)
    console.log('obj',obj)
    console.log('id',id)
  }

  return (
    <TableRow className={`${selectedState ? 'border border-red-500' : ''}`}>
      <TableCell>
        <input checked={selectedState} type='checkbox' onChange={handleOnClick}></input>
      </TableCell>
      <TableCell>
        {orderRequest.name}
      </TableCell>
      <TableCell>
        {orderRequest.description}
      </TableCell>
      <TableCell>
        {orderRequest.status}
      </TableCell>
    </TableRow>
  )
}
export default ChangeOrderRequestTableRow