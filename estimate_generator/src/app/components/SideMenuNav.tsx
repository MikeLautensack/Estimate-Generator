'use client'

import React from 'react'
import Button from './Button'

const SideMenuNav = () => {
  return (
    <nav>
        <Button
            id='dashboard-button'
            className=''
        >
            Dashboard
        </Button>
        <Button
            id='customers-button'
            className=''
        >
            
            Customers
        </Button>
        <Button
            id='estimates-button'
            className=''
        >
            Estimates
        </Button>
    </nav>
  )
}

export default SideMenuNav