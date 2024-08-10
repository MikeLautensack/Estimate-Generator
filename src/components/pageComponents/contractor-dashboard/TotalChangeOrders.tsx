import { db } from "@/db";
import { changeOrders } from "@/db/schemas/changeOrders";
import { Card, Typography } from "@mui/material";

type TotalChangeOrdersProps = {
  changeOrders: any[];
};

export default async function TotalChangeOrders({
  changeOrders,
}: TotalChangeOrdersProps) {
  return (
    <Card
      sx={{ backgroundColor: "surfaceContainerLow" }}
      className="flex justify-between items-center rounded-lg p-4"
    >
      <Typography variant="body1" color="primary">
        Total Change Orders
      </Typography>
      <Typography variant="body1" color="primary">
        {changeOrders?.length}
      </Typography>
    </Card>
  );
}
