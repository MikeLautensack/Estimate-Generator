import { ChangeOrder } from "@/types/changeOrders";
import { Box, Typography } from "@mui/material";
import React from "react";
import EstimateFormChangeOrderTable from "./EstimateFormChangeOrderTable";

type EstimateFormChangeOrdersTabProps = {
  changeOrders?: ChangeOrder[];
};

const EstimateFormChangeOrdersTab = ({
  changeOrders,
}: EstimateFormChangeOrdersTabProps) => {
  return (
    <Box component="div" className="flex flex-col gap-2 desktop:gap-4 w-full">
      <Typography variant="h6" color="primary">
        Change Order Requests
      </Typography>
      <EstimateFormChangeOrderTable changeOrders={changeOrders!} />
    </Box>
  );
};

export default EstimateFormChangeOrdersTab;
