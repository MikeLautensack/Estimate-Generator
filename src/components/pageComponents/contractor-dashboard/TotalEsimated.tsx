import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { formatPriceString } from "@/utils/formatingFunctions";
import { Card, Typography } from "@mui/material";
import React from "react";

async function getData() {
  try {
    const res = await db.select().from(estimates);
    return res;
  } catch (error) {
    console.log(error);
  }
}

const getTotal = (data: any) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += parseFloat(data[i].total);
  }
  return total;
};

const TotalEsimated = async () => {
  const data = await getData();
  const total = getTotal(data);
  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center rounded-lg p-4"
    >
      <Typography variant="body1" color="primary">
        Total Estimated
      </Typography>
      <Typography variant="body1" color="cash">
        {formatPriceString(total.toString())}
      </Typography>
    </Card>
  );
};

export default TotalEsimated;
