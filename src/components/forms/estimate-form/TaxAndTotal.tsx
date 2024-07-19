import { Box } from "@mui/material";
import React, { useEffect } from "react";
import MVLReadOnlyInput from "../inputs/MVLReadOnlyInput";
import { useFormContext, useWatch } from "react-hook-form";
import useCalcTax from "./hooks/useCalcTax";
import MVLMoneyInput from "../inputs/MVLMoneyInput";
import MVLPercent from "../inputs/MVLPercent";

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
        <MVLMoneyInput
          label="Subtotal"
          size="small"
          name="subtotal"
          readonly={true}
        />
      </div>
      <div className="w-44">
        <MVLPercent label="Tax Rate" size="small" name="taxRate" />
      </div>
      <div className="w-44">
        <MVLMoneyInput label="Tax" size="small" name="tax" readonly={true} />
      </div>
      <div className="w-44">
        <MVLMoneyInput
          label="Total"
          size="small"
          name="total"
          readonly={true}
        />
      </div>
    </Box>
  );
};

export default TaxAndTotal;
