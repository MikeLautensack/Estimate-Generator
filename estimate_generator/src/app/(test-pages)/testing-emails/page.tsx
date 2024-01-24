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
                signIn('email', {email: 'mikelautensack100@gmail.com', callbackUrl: 'http://localhost:3000/api/redirect?email-type=newCustomer', redirect: false})
            }}
        >
            New Customer Email
        </Button>
        <Button
            className=''
            onClick={async () => {
                signIn('email', {email: 'mikelautensack100@gmail.com', callbackUrl: 'http://localhost:3000/api/redirect?email-type=newEstimate', redirect: false})
            }}
        >
            New Estimate Email
        </Button>
        <Button
            className=''
            onClick={async () => {
                signIn('email', {email: 'mikelautensack100@gmail.com', callbackUrl: 'http://localhost:3000/api/redirect?email-type=updatedEstimate', redirect: false})
            }}
        >
            Update Estimate Email
        </Button>
    </div>
  )
}
