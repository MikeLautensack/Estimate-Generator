import CustomerForm from "@/components/forms/customer-form/CustomerForm";
import { Customers } from "@/types/customers";
import { Box, Typography } from "@mui/material";
import { auth } from "../../../../../../auth";

const Page = async () => {
  const customer = {} as Customers;
  const session = await auth();

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col gap-4 justify-start items-start flex-1">
      <Typography variant="h4" color="primary">
        New Customer Form
      </Typography>
      <Box
        component="div"
        className="flex justify-center items-center w-full h-full"
      >
        <CustomerForm
          data={customer}
          mode="new-customer"
          user_id={session?.user.id}
          session={session!}
        />
      </Box>
    </main>
  );
};

export default Page;
