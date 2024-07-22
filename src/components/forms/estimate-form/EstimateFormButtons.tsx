import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { SetStateAction } from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import {
  EstimateFormValues,
  SaveAndSentStatus,
  SaveStatus,
} from "./EstimateForm";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import useConditionalNextButton from "./hooks/useConditionalNextButton";

type EstimateFormButtonsProps = {
  tab: number;
  setTab: React.Dispatch<SetStateAction<number>>;
  tabsCount: number;
  save: SubmitHandler<EstimateFormValues>;
  saveAndSend: SubmitHandler<EstimateFormValues>;
  saveStatus: SaveStatus;
  saveAndSaveStatus: SaveAndSentStatus;
  mode: "new-estimate" | "update-estimate";
};

const EstimateFormButtons = ({
  tab,
  setTab,
  tabsCount,
  save,
  saveAndSend,
  saveStatus,
  saveAndSaveStatus,
  mode,
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
          variant="contained"
          className="w-full"
          onClick={() => setTab(tab - 1)}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        >
          <ChevronLeftIcon />
          Previous
        </Button>
      )}
      <Button
        type="submit"
        variant="contained"
        className="w-full"
        disabled={
          saveStatus === "saving" ||
          saveAndSaveStatus === "saving" ||
          saveAndSaveStatus === "sending"
        }
      >
        Preview Estimate
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit(save)}
        variant="contained"
        className="w-full"
        color={
          saveStatus === "error"
            ? "error"
            : saveStatus === "saved"
              ? "success"
              : "primary"
        }
        disabled={
          saveStatus === "saving" ||
          saveAndSaveStatus === "saving" ||
          saveAndSaveStatus === "sending"
        }
      >
        {mode === "new-estimate" && saveStatus === "not-saved" ? (
          <Typography variant="button">Save New Estimate</Typography>
        ) : mode === "update-estimate" && saveStatus === "not-saved" ? (
          <Typography variant="button">Update Estimate</Typography>
        ) : saveStatus === "saving" ? (
          <CircularProgress sx={{ color: "#001824" }} />
        ) : saveStatus === "error" ? (
          <Typography variant="button">Error</Typography>
        ) : mode === "new-estimate" && saveStatus === "saved" ? (
          <Typography variant="button">New Estimate Saved!</Typography>
        ) : (
          mode === "update-estimate" &&
          saveStatus === "saved" && (
            <Typography variant="button">Estimate Updated!</Typography>
          )
        )}
      </Button>
      <Button
        type="submit"
        onClick={handleSubmit(saveAndSend)}
        variant="contained"
        className="w-full"
        color={
          saveAndSaveStatus === "error"
            ? "error"
            : saveAndSaveStatus === "saved"
              ? "success"
              : "primary"
        }
        disabled={
          saveStatus === "saving" ||
          saveAndSaveStatus === "saving" ||
          saveAndSaveStatus === "sending"
        }
      >
        {mode === "new-estimate" && saveAndSaveStatus === "not-saved" ? (
          <Typography variant="button">Save & Send New Estimate</Typography>
        ) : mode === "update-estimate" && saveAndSaveStatus === "not-saved" ? (
          <Typography variant="button">Update & Send Estimate</Typography>
        ) : saveAndSaveStatus === "saving" ? (
          <CircularProgress sx={{ color: "#001824" }} />
        ) : saveAndSaveStatus === "sending" ? (
          <Typography variant="button">Sending</Typography>
        ) : saveAndSaveStatus === "error" ? (
          <Typography variant="button">Error</Typography>
        ) : mode === "new-estimate" && saveAndSaveStatus === "saved" ? (
          <Typography variant="button">New Estimate Saved & Sent!</Typography>
        ) : (
          mode === "update-estimate" &&
          saveAndSaveStatus === "saved" && (
            <Typography variant="button">Estimate Updated & Sent!</Typography>
          )
        )}
      </Button>
      {isLastTab && (
        <Button
          variant="contained"
          className="w-full"
          onClick={() => setTab(tab + 1)}
          disabled={
            saveStatus === "saving" ||
            saveAndSaveStatus === "saving" ||
            saveAndSaveStatus === "sending"
          }
        >
          Next
          <ChevronRightIcon />
        </Button>
      )}
    </Box>
  );
};

export default EstimateFormButtons;
