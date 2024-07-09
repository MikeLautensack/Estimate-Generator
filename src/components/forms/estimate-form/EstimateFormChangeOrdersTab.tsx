import { ChangeOrder } from "@/types/changeOrders";
import { Box } from "@mui/material";
import React from "react";

type EstimateFormChangeOrdersTabProps = {
  changeOrders?: ChangeOrder[];
};

const EstimateFormChangeOrdersTab = ({
  changeOrders,
}: EstimateFormChangeOrdersTabProps) => {
  return (
    <Box component="div" className="">
      change orders tab
    </Box>
  );
};

export default EstimateFormChangeOrdersTab;
