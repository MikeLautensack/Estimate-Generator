'use client'

import { ChangeOrderRequestsProps, ChangeOrders } from '@/types/changeOrders'
import React, { useEffect, useState } from 'react'
import ChangeOrderRequestsTable from '../tables/contractorTables/changeOrderRequestsTable/ChangeOrderRequestsTable'
import { columns } from "@/components/tables/contractorTables/changeOrderRequestsTable/columns";
import { Button } from '../ui/button';
import ChangeOrderRequest from './ChangeOrderRequest';
import { RowSelectionState } from '@tanstack/react-table';

const ChangeOrderRequests = ({ changeOrders }: ChangeOrderRequestsProps) => {

  const [ rowSelection, setRowSelection ] = useState<RowSelectionState>({})
  const [ changeOrder, setChangeOrder ] = useState<ChangeOrders>(changeOrders?.length ? changeOrders[0] : {
    id: 0,
    changeOrderName: null,
    estimateName: null,
    description: null,
    customerName: null,
    projectAddress: null,
    status: null,
    estimate_id: null,
    dateCreated: null,
    dateUpdated: null,
    contractor_user_id: null,
    customer_user_id: null,
  })

  const createDateArray = (arr: ChangeOrders[]): any[] => {
    if (arr == undefined || null) {
     return []
    } else {
      return arr
    }
  }

  useEffect(() => {
    console.log(rowSelection)
    // setChangeOrder()
  }, [rowSelection])

  return (
    <div className='bg-blue-200'>
        <h1>Change Order Requests</h1>
        <p>{`You have ${changeOrders?.length} change order requests`}</p>
        <div
            id='tabel'
            className=''
        >
          <ChangeOrderRequestsTable 
            columns={columns} 
            data={createDateArray(changeOrders)} 
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        </div>
        <div
            id='selected'
            className=''
        >
          <ChangeOrderRequest changeOrder={changeOrder}/>
        </div>
        <div
            id='buttons'
            className=''
        >
          <Button
            id=''
            className=''
            onClick={() => {}}
          >
            Mark Completed            
          </Button>
          <Button
            id=''
            className=''
            onClick={() => {}}
          >
            Save For Later
          </Button>
          <Button
            id=''
            className=''
            onClick={() => {}}
          >
            Reject
          </Button>
        </div>
    </div>
  )
}

export default ChangeOrderRequests