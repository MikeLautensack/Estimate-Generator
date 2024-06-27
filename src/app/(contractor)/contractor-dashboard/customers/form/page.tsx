import CustomerForm from "@/components/forms/customer-form/CustomerForm";
import { Customers } from "@/types/customers";
import { Card, Typography } from "@mui/material";

const Page = () => {
  const customer = {} as Customers;

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1">
      <Typography variant="h4" color="primary" className="">
        Customer Form
      </Typography>
      <Card className="flex justify-center items-center flex-1 w-full">
        <CustomerForm data={customer} />
      </Card>
    </main>
  );
};

export default Page;
