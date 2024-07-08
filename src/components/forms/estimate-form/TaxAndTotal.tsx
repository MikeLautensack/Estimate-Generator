import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import MVLReadOnlyInput from "../inputs/MVLReadOnlyInput";

const TaxAndTotal = () => {
  return (
    <Box component="div" className="flex flex-col gap-3">
      <div className="w-44">
        <MVLReadOnlyInput
          label="Subtotal"
          size="small"
          name="subtotal"
          prefix="$"
        />
      </div>
      <div className="w-44">
        <MVLReadOnlyInput label="Tax" size="small" name="tax" prefix="%" />
      </div>
      <div className="w-44">
        <MVLReadOnlyInput label="Total" size="small" name="total" prefix="$" />
      </div>
    </Box>
  );
};

export default TaxAndTotal;
