import { Box, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useCalcTax from "./hooks/useCalcTax";
import MVLMoneyInput from "../inputs/MVLMoneyInput";
import MVLTaxRate from "../inputs/MVLTaxRate";
import { SaveAndSentStatus, SaveStatus } from "./EstimateForm";
import MVLPercent from "../inputs/MVLPercent";
import useCalcDiscount from "./hooks/useCalcDiscount";

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
  const taxMode = useWatch({ control, name: "taxMode" });
  const discountMode = useWatch({ control, name: "discountMode" });
  const discountPercentage = useWatch({ control, name: "discountPercentage" });

  // Custom hooks
  const tax = useCalcTax(subtotal, taxRateVal);
  const discount = useCalcDiscount(discountPercentage, subtotal);

  // Effects
  useEffect(() => {
    setValue("tax", tax);
  }, [setValue, tax]);

  useEffect(() => {
    if (taxMode === "Sales Tax" && taxRateVal === "0") {
      setValue("taxRate", "7");
    }

    if (taxMode === "No Tax") {
      setValue("taxRate", "0");
    }
  }, [setValue, taxMode, taxRateVal]);

  useEffect(() => {
    if (discountMode === "Percentage Discount") {
      setValue("discount", discount);
    }

    if (discountMode === "No Discount") {
      setValue("discount", "0");
      setValue("discountPercentage", "0");
    }
  }, [discount, discountMode, setValue]);

  return (
    <Box
      component="div"
      className="flex flex-col gap-4 justify-start items-end"
    >
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
      <div
        className={`flex flex-col gap-4 justify-center items-center desktop:flex-row ${taxMode === "No Tax" && "hidden"}`}
      >
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
      </div>
      <div
        className={`flex flex-col gap-4 justify-center items-center desktop:flex-row ${discountMode === "No Discount" && "hidden"}`}
      >
        <div
          className={`w-44 ${discountMode === "No Discount" ? "hidden" : discountMode === "Flat Rate Discount" && "hidden"}`}
        >
          <MVLPercent
            label="Discount Percentage"
            size="small"
            name="discountPercentage"
            disabled={
              saveStatus === "saving" ||
              saveAndSaveStatus === "saving" ||
              saveAndSaveStatus === "sending"
            }
          />
        </div>
        <div className={`w-44 ${discountMode === "No Discount" && "hidden"}`}>
          <MVLMoneyInput
            label="Discount"
            size="small"
            name="discount"
            disabled={
              saveStatus === "saving" ||
              saveAndSaveStatus === "saving" ||
              saveAndSaveStatus === "sending"
            }
          />
        </div>
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
