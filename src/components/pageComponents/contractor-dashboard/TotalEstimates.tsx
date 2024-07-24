import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { Card, Typography } from "@mui/material";

async function getData() {
  try {
    const res = await db.select().from(estimates);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default async function TotalEstimates() {
  const data = await getData();

  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center rounded-lg p-4"
    >
      <Typography variant="body1" color="primary">
        Total Estimates
      </Typography>
      <Typography variant="body1" color="primary">
        {data?.length}
      </Typography>
    </Card>
  );
}
