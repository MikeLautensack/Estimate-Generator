import React from 'react'
import Button from '../../misc/Button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from './Overview'
import ChangeOrders from './ChangeOrders'
import Emails from './Emails'


const DashboardContent = () => {
  return (
    <section
        id='dashboard-content'
        className=''
    >
        <Tabs
            defaultValue='overview'
            className=''
        >
            <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='change-orders'>Change Orders</TabsTrigger>
                <TabsTrigger value='emails'>Emails</TabsTrigger>
            </TabsList>
            <TabsContent
                value='overview'
            >
                <Overview />
            </TabsContent>
            <TabsContent
                value='change-orders'
            >
                <ChangeOrders />
            </TabsContent>
            <TabsContent
                value='emails'
            >
                <Emails />
            </TabsContent>
        </Tabs>
    </section>
  )
}

export default DashboardContent