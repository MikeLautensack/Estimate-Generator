import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { Estimates } from "@/types/estimates";
import { formatPriceString } from "@/utils/formatingFunctions";
import { Card, Typography } from "@mui/material";
import React from "react";

type TotalEsimatedProps = {
  estimates: any[];
};

const getTotal = (data: any) => {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += parseFloat(data[i].total);
  }
  return total;
};

const TotalEsimated = async ({ estimates }: TotalEsimatedProps) => {
  const total = getTotal(estimates);
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
