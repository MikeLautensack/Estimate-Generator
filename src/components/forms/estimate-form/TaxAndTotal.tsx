import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useCalcTax from "./hooks/useCalcTax";
import MVLMoneyInput from "../inputs/MVLMoneyInput";
import MVLTaxRate from "../inputs/MVLTaxRate";
import { SaveAndSentStatus, SaveStatus } from "./EstimateForm";

type TaxAndTotalProps = {
  saveStatus?: SaveStatus;
  saveAndSaveStatus?: SaveAndSentStatus;
};

const TaxAndTotal = ({ saveStatus, saveAndSaveStatus }: TaxAndTotalProps) => {
  // Hooks
  const { control, setValue } = useFormContext();

  // Watched fields
  const taxRateVal = useWatch({ control, name: "taxRate" });
  const subtotal = useWatch({ control, name: "subtotal" });

  // Custom hooks
  const tax = useCalcTax(subtotal, taxRateVal);

  // Effects
  useEffect(() => {
    setValue("tax", tax);
  }, [setValue, tax]);

  return (
    <Box component="div" className="flex flex-col gap-4">
      <div className="w-44">
        <MVLMoneyInput
          label="Subtotal"
          size="small"
          name="subtotal"
          readonly={true}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
      </div>
      <div className="w-44">
        <MVLTaxRate
          label="Tax Rate"
          size="small"
          name="taxRate"
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
      </div>
      <div className="w-44">
        <MVLMoneyInput
          label="Tax"
          size="small"
          name="tax"
          readonly={true}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
      </div>
      <div className="w-44">
        <MVLMoneyInput
          label="Total"
          size="small"
          name="total"
          readonly={true}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        />
      </div>
    </Box>
  );
};

export default TaxAndTotal;
