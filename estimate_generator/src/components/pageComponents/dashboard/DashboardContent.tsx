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
            <TabsList className='rounded-none bg-transparent'>
                <TabsTrigger className='rounded-none data-[state=active]:bg-transparent data-[state=active]:border data-[state=active]:border-b-2 data-[state=active]:border-primary500' value='overview'>Overview</TabsTrigger>
                <TabsTrigger className='rounded-none data-[state=active]:bg-transparent data-[state=active]:border data-[state=active]:border-b-2 data-[state=active]:border-primary500' value='change-orders'>Change Orders</TabsTrigger>
                <TabsTrigger className='rounded-none data-[state=active]:bg-transparent data-[state=active]:border data-[state=active]:border-b-2 data-[state=active]:border-primary500' value='emails'>Emails</TabsTrigger>
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