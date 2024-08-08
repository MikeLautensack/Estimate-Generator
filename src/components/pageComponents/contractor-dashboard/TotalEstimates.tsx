import { db } from "@/db";
import { estimates } from "@/db/schemas/estimates";
import { Estimates } from "@/types/estimates";
import { Card, Typography } from "@mui/material";

type TotalEstimatesProps = {
  estimates: any[];
};

export default async function TotalEstimates({
  estimates,
}: TotalEstimatesProps) {
  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center rounded-lg p-4"
    >
      <Typography variant="body1" color="primary">
        Total Estimates
      </Typography>
      <Typography variant="body1" color="primary">
        {estimates?.length}
      </Typography>
    </Card>
  );
}
