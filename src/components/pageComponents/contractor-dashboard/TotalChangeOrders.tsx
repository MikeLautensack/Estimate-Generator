import { db } from "@/db";
import { changeOrders } from "@/db/schemas/changeOrders";
import { Card, Typography } from "@mui/material";

async function getData() {
  try {
    const res = await db.select().from(changeOrders);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default async function TotalChangeOrders() {
  const data = await getData();

  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center rounded-lg p-4"
    >
      <Typography variant="body1" color="primary">
        Total Change Orders
      </Typography>
      <Typography variant="body1" color="primary">
        {data?.length}
      </Typography>
    </Card>
  );
}
