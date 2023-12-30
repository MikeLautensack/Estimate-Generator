'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ChangeOrderRequestsTableProps } from "@/types/types"
import { useEffect, useState } from "react"
import ChangeOrderRequestTableRow from "./ChangeOrderRequestTableRow"

export default function ChangeOrderRequestsTable<TData, TValue>({
  data
}: ChangeOrderRequestsTableProps<TData, TValue>) {

  const [ ordersSelectedState, setOrdersSelectedState ] = useState({})

  useEffect(() => {
    setOrdersSelectedState(
      data.reduce((obj, item) => {
      obj[item.id] = false;
      return obj;
    }, {} as {[key: number]: boolean}))
    console.log('useEffect []', ordersSelectedState)
  }, [])
  
  return (
    <div className="">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
              <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
                {data.map((element, index) => (
                  <ChangeOrderRequestTableRow 
                    orderRequest={{
                      name: data[index].changeOrderName as string,
                      description: data[index].description as string,
                      status: data[index].status as string,
                    }}
                    ordersSelectedState={ordersSelectedState}
                    setOrdersSelectedState={setOrdersSelectedState}
                    key={data[index].id}
                    id={data[index].id}
                  />
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
