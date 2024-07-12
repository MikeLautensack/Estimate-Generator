import { Box } from "@mui/material";
import React, { useEffect } from "react";
import MVLReadOnlyInput from "../inputs/MVLReadOnlyInput";
import { useFormContext, useWatch } from "react-hook-form";
import useCalcTax from "./hooks/useCalcTax";

const TaxAndTotal = () => {
  // Hooks
  const { control, setValue } = useFormContext();

  // Watched fields
  const taxRateVal = useWatch({ control, name: "taxRate" });
  const subtotal = useWatch({ control, name: "subtotal" });
  console.log(
    "This log is testing the value of `subtotal` returned from useWatch in the tax and total compl",
    subtotal,
  );

  // Custom hooks
  const tax = useCalcTax(subtotal, taxRateVal);

  // Effects
  useEffect(() => {
    setValue("tax", tax);
    console.log(
      "This log is testing the value of tax from useCalcTax inside the useEffect that sets the tax field",
      tax,
    );
  }, [setValue, tax]);

  return (
    <Box component="div" className="flex flex-col gap-4">
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
