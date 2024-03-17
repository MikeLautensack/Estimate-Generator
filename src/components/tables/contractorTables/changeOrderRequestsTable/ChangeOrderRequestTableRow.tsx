"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { ChangeOrderRequestRowProps } from "@/types/changeOrders";
import { useEffect, useState } from "react";

const ChangeOrderRequestTableRow = ({ 
  orderRequest, 
  setOrdersSelectedState,
  ordersSelectedState,
  id,
}: ChangeOrderRequestRowProps) => {

  const [ selectedState, setSelectedState ] = useState(false);

  useEffect(() => {
    for (const key in ordersSelectedState) {
      if (parseInt(key) == id) {   
        setSelectedState(ordersSelectedState[key])
      }
    }
  }, [ordersSelectedState])

  const handleOnClick = () => {
    let obj = {...ordersSelectedState};
    for (const key in obj) {
      if (parseInt(key) == id) {
        obj[key] = true
      } else {
        obj[key] = false
      }
    }
    setOrdersSelectedState(obj);
  }

  return (
    <TableRow className={`${selectedState ? "border border-red-500" : ""}`}>
      <TableCell>
        <input 
          checked={selectedState} 
          type="checkbox" 
          onChange={handleOnClick}
        ></input>
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
export default ChangeOrderRequestTableRow;