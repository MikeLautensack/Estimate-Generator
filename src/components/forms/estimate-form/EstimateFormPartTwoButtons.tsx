import {
  preview,
  save,
  saveAndSend,
} from "@/utils/formUtils/estimateFormUtils";
import { Box, Button } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

const EstimateFormPartTwoButtons = () => {
  // Hooks
  const { handleSubmit } = useFormContext();
  return (
    <Box
      component="div"
      className="flex flex-col desktop:flex-row justify-center items-center gap-4"
    >
      <Button
        type="submit"
        onClick={handleSubmit(preview)}
        variant="contained"
        className="w-full"
      >
        Preview Estimate
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit(save)}
        variant="contained"
        className="w-full"
      >
        Save
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit(saveAndSend)}
        variant="contained"
        className="w-full"
      >
        Save & Send
      </Button>
    </Box>
  );
};

export default EstimateFormPartTwoButtons;
