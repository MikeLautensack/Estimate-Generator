'use client'

import { ChangeOrderRequestProps } from '@/types/changeOrders'
import React from 'react'

const ChangeOrderRequest = ({ changeOrder }: ChangeOrderRequestProps) => {
  return (
    <div
        id='change-order'
        className=''
    >
        <h1>{changeOrder.changeOrderName}</h1>
        <div></div>
        <p>{changeOrder.description}</p>
        <div></div>
        <div>
            <div
                id='date-data-container'
            >
                <p>{changeOrder.dateCreated?.getTime() === changeOrder.dateUpdated?.getTime() ? 'Date Created: ' : 'Date Updated: '}</p>
                <p>{changeOrder.dateCreated?.getTime() === changeOrder.dateUpdated?.getTime() ? changeOrder.dateCreated?.toString() : changeOrder.dateUpdated?.toString()}</p>
            </div>
            <div
                id='status-container'
                className=''
            >
                <p>{changeOrder.status}</p>
            </div>
        </div>
    </div>
  )
}

export default ChangeOrderRequest