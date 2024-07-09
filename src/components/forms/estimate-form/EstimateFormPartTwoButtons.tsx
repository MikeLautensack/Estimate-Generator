import { Box, Button } from "@mui/material";
import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { EstimateFormValues } from "./EstimateForm";

type EstimateFormPartTwoButtonsProps = {
  save: SubmitHandler<EstimateFormValues>;
};

const EstimateFormPartTwoButtons = ({
  save,
}: EstimateFormPartTwoButtonsProps) => {
  // Hooks
  const { handleSubmit } = useFormContext<EstimateFormValues>();
  return (
    <Box
      component="div"
      className="flex flex-col desktop:flex-row justify-center items-center gap-4"
    >
      <Button type="submit" variant="contained" className="w-full">
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
      <Button type="submit" variant="contained" className="w-full">
        Save & Send
      </Button>
    </Box>
  );
};

export default EstimateFormPartTwoButtons;
