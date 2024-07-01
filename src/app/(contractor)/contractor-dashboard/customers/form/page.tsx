import CustomerForm from "@/components/forms/customer-form/CustomerForm";
import { Customers } from "@/types/customers";
import { Box, Card, Typography } from "@mui/material";

const Page = () => {
  const customer = {} as Customers;

  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start flex-1">
      <Typography variant="h4" color="primary" className="">
        Customer Form
      </Typography>
      <Box
        component="div"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomerForm data={customer} />
      </Box>
    </main>
  );
};

export default Page;
