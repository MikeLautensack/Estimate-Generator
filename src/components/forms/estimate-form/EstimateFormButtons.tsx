import { Box, Button } from "@mui/material";
import React, { SetStateAction } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { EstimateFormValues } from "./EstimateForm";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useConditionalNextButton from "./hooks/useConditionalNextButton";

type EstimateFormButtonsProps = {
  tab: number;
  setTab: React.Dispatch<SetStateAction<number>>;
  tabsCount: number;
  save: SubmitHandler<EstimateFormValues>;
};

const EstimateFormButtons = ({
  tab,
  setTab,
  tabsCount,
  save,
}: EstimateFormButtonsProps) => {
  // Hooks
  const { handleSubmit } = useFormContext<EstimateFormValues>();
  const isLastTab = useConditionalNextButton(tab, tabsCount);

  return (
    <Box
      component="div"
      className="flex flex-col desktop:flex-row justify-center items-center gap-4"
    >
      {tab !== 0 && (
        <Button
          type="submit"
          variant="contained"
          className="w-full"
          onClick={() => setTab(tab - 1)}
        >
          <ChevronLeftIcon />
          Previous
        </Button>
      )}
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
      {isLastTab && (
        <Button
          type="submit"
          variant="contained"
          className="w-full"
          onClick={() => setTab(tab + 1)}
        >
          Next
          <ChevronRightIcon />
        </Button>
      )}
    </Box>
  );
};

export default EstimateFormButtons;
