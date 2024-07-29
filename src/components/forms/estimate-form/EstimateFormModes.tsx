import { Box } from "@mui/material";
import React from "react";
import MVLAutocomplete from "../inputs/MVLAutocomplete";
import { SaveAndSentStatus, SaveStatus } from "./EstimateForm";
import { useFormContext, useWatch } from "react-hook-form";

type EstimateFormModesProps = {
  saveStatus?: SaveStatus;
  saveAndSaveStatus?: SaveAndSentStatus;
};

const EstimateFormModes = ({
  saveStatus,
  saveAndSaveStatus,
}: EstimateFormModesProps) => {
  // Hooks
  const { control } = useFormContext();

  // Watched fields
  const taxMode = useWatch({ control, name: "taxMode" });

  return (
    <Box
      component="div"
      className="flex flex-col gap-4 justify-start items-start w-44"
    >
      {taxMode !== "No Tax" && (
        <Box component="div" className="desktop:h-10"></Box>
      )}
      <MVLAutocomplete
        name="taxMode"
        label="Tax Mode"
        options={[{ label: "No Tax" }, { label: "Sales Tax" }]}
        size="small"
        disabled={
          saveStatus === "saving" ||
          saveAndSaveStatus === "saving" ||
          saveAndSaveStatus === "sending"
        }
      />
      <MVLAutocomplete
        name="discountMode"
        label="Discount Mode"
        options={[
          { label: "No Discount" },
          { label: "Flat Rate Discount" },
          { label: "Percentage Discount" },
        ]}
        size="small"
        disabled={
          saveStatus === "saving" ||
          saveAndSaveStatus === "saving" ||
          saveAndSaveStatus === "sending"
        }
      />
    </Box>
  );
};

export default EstimateFormModes;
