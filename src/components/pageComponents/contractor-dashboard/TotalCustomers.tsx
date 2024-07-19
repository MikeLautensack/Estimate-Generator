import { db } from "@/db";
import { customers } from "@/db/schemas/customers";
import { Card } from "@mui/material";

async function getData() {
  try {
    const res = await db.select().from(customers);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default async function TotalCustomers() {
  const data = await getData();

  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center p-4 rounded-lg"
    >
      <h1>Total Customers</h1>
      <h2>{data?.length}</h2>
    </Card>
  );
}
