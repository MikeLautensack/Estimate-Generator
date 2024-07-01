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
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Button type="submit" onClick={handleSubmit(preview)} variant="contained">
        Preview Estimate
      </Button>
      <Button type="submit" onClick={handleSubmit(save)} variant="contained">
        Save
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit(saveAndSend)}
        variant="contained"
      >
        Save & Send
      </Button>
    </Box>
  );
};

export default EstimateFormPartTwoButtons;
