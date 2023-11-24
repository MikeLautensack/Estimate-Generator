import ChangeOrders from "@/components/pageComponents/customer-dashboard/ChangeOrders";
import Estimates from "@/components/pageComponents/customer-dashboard/Estimates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <main className="bg-secondary200 p-8 w-full">
      <h1 className="text-primary800">Customer Dashboard</h1>
      <Tabs
          defaultValue='overview'
          className=''
      >
          <TabsList className=''>
              <TabsTrigger className='' value='overview'>Estimates</TabsTrigger>
              <TabsTrigger className='' value='change-orders'>Change Orders</TabsTrigger>
          </TabsList>
          <TabsContent
              value='overview'
          >
              <Estimates />
          </TabsContent>
          <TabsContent
              value='change-orders'
          >
             <ChangeOrders />
          </TabsContent>
      </Tabs>
    </main>
  )
}