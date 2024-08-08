import { db } from "@/db";
import { customers } from "@/db/schemas/customers";
import { Customers } from "@/types/customers";
import { Card, Typography } from "@mui/material";

type TotalCustomersProps = {
  customers: Customers[];
};

export default async function TotalCustomers({
  customers,
}: TotalCustomersProps) {
  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center p-4 rounded-lg"
    >
      <Typography variant="body1" color="primary">
        Total Customers
      </Typography>
      <Typography variant="body1" color="primary">
        {customers?.length}
      </Typography>
    </Card>
  );
}
