'use client'

import { ChangeOrderRequestsProps, ChangeOrders } from '@/types/changeOrders'
import React, { useEffect, useState } from 'react'
import ChangeOrderRequestsTable from '../tables/contractorTables/changeOrderRequestsTable/ChangeOrderRequestsTable'
import { Button } from '../ui/button';
import ChangeOrderRequest from './ChangeOrderRequest';

const ChangeOrderRequests = ({ changeOrders }: ChangeOrderRequestsProps) => {

  const [ orders, setOrders ] = useState(changeOrders)
  const [ id, setId ] = useState<number | null>(changeOrders?.length ? changeOrders[0].id : null)
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

  const createDateArray = (arr: ChangeOrders[]): ChangeOrders[] => {
    if (arr == undefined || null) {
     return []
    } else {
      return arr
    }
  }

  useEffect(() => {
    loadChangeOrder(id as number)
  }, [id])

  const loadChangeOrder = (id: number) => {
    for (let i = 0; i < changeOrders.length; i++) {
      if (changeOrders[i].id == id) {
        setChangeOrder(changeOrders[i])
      }
    }
  }

  const removeItem = (id: number) => {
    setOrders(prevOrders => {
      const arr = prevOrders.filter(order => order.id != id)
      setId(arr.length > 0 ? arr[0].id : null)
      return arr
    });
  }

  const markCompleted = async (id: number) => {
    const res = await fetch(`${process.env["NEXT_PUBLIC_CHANGE_ORDERS_UPDATE_STATUS"]}/${id}`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: 'Completed'
      })
    })
    removeItem(id)
  }

  const reject = async (id: number) => {
    const res = await fetch(`${process.env["NEXT_PUBLIC_CHANGE_ORDERS_UPDATE_STATUS"]}/${id}`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: 'Rejected'
      })
    })
    removeItem(id)
  }

  const saveForLater = async (id: number) => {
    const res = await fetch(`${process.env["NEXT_PUBLIC_CHANGE_ORDERS_UPDATE_STATUS"]}/${id}`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: 'Saved For Later'
      })
    })
    removeItem(id)
  }

  return (
    <div className='bg-blue-200'>
        <h1>Change Order Requests</h1>
        <p>{`You have ${orders?.length} change order requests`}</p>
        <div
            id='tabel'
            className=''
        >
          <ChangeOrderRequestsTable  
            data={orders}
            setId={setId}
            id={id as number}
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
            onClick={() => markCompleted(id as number)}
          >
            Mark Completed            
          </Button>
          <Button
            id=''
            className=''
            onClick={() => saveForLater(id as number)}
          >
            Save For Later
          </Button>
          <Button
            id=''
            className=''
            onClick={() => reject(id as number)}
          >
            Reject
          </Button>
        </div>
    </div>
  )
}

export default ChangeOrderRequests