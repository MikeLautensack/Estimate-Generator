'use client'

import { ChangeOrderRequestProps } from '@/types/changeOrders'
import React from 'react'

const ChangeOrderRequest = ({ changeOrder }: ChangeOrderRequestProps) => {
  return (
    <div
        id='change-order'
        className='rounded bg-neutral100 p-2 flex flex-col desktop:h-[216px]'
    >
        <h1>{changeOrder.changeOrderName}</h1>
        <div className='w-full border-b-2 border-blue-500'></div>
        <div className='w-full'>
            <p>{changeOrder.description}</p>
        </div>
        <div className='w-full border-b-2 border-blue-500'></div>
        <div className='flex justify-between items-center'>
            <div
                id='date-data-container'
                className='flex flex-col gap-1 max-w-[50%]'
            >
                <p>{changeOrder.dateCreated?.getTime() === changeOrder.dateUpdated?.getTime() ? 'Date Created: ' : 'Date Updated: '}</p>
                <p>{changeOrder.dateCreated?.getTime() === changeOrder.dateUpdated?.getTime() ? changeOrder.dateCreated?.toString() : changeOrder.dateUpdated?.toString()}</p>
            </div>
            <div
                id='status-container'
                className='max-w-[50%]'
            >
                <p>{changeOrder.status}</p>
            </div>
        </div>
    </div>
  )
}

export default ChangeOrderRequest