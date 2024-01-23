'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <div className=''>
        <Button
            className=''
            onClick={async () => {
                signIn('newCustomer', {email: 'mikelautensack100@gmail.com', callbackUrl: 'http://localhost:3000/api/redirect', redirect: false})
            }}
        >
            New Customer Email
        </Button>
        <Button
            className=''
            onClick={async () => {
                signIn('newEstimate', {email: 'mikelautensack100@gmail.com', callbackUrl: 'http://localhost:3000/api/redirect', redirect: false})
            }}
        >
            New Estimate Email
        </Button>
        <Button
            className=''
            onClick={async () => {
                signIn('updatedEstimate', {email: 'mikelautensack100@gmail.com', callbackUrl: 'http://localhost:3000/api/redirect', redirect: false})
            }}
        >
            Update Estimate Email
        </Button>
    </div>
  )
}
