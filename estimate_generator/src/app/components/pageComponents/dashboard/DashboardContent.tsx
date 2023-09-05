import React from 'react'
import Button from '../../Button'

const DashboardContent = () => {
  return (
    <section>
        <div
            id='dashboard-tabs'
            className=''
        >
            <Button
                id='overview-tabs-button'
                className=''
            >
                Overview
            </Button>
            <Button
                id='change-orders-tab-button'
                className=''
            >
                Change Orders
            </Button>
            <Button
                id='emails-tab-button'
                className=''
            >
                Email
            </Button>
        </div>
        <div
            id='dashboard-pages'
            className=''
        >

        </div>
    </section>
  )
}

export default DashboardContent