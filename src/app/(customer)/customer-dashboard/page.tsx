import ChangeOrders from "@/components/pageComponents/customer-dashboard/ChangeOrders";
import Estimates from "@/components/pageComponents/customer-dashboard/Estimates";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Page = () => {
  return (
    <main className="bg-primary100 p-4 w-full bg-gradient-to-br from-primary200 to-secondary200">
      <h1 className="text-primary900 font-bold text-2xl my-2">Customer Dashboard</h1>
      <Tabs
          defaultValue="overview"
          className=""
      >
          <TabsList className="">
              <TabsTrigger 
                className="" 
                value="overview"
              >
                Estimates
              </TabsTrigger>
              <TabsTrigger 
                className="" 
                value="change-orders"
              >
                Change Orders
              </TabsTrigger>
          </TabsList>
          <TabsContent
              value="overview"
          >
              <Estimates />
          </TabsContent>
          <TabsContent
              value="change-orders"
          >
             <ChangeOrders />
          </TabsContent>
      </Tabs>
    </main>
  );
}

export default Page;