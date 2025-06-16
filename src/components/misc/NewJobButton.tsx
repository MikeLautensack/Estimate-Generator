"use client";

import { useJobsFormContext } from "@/contexts/JobsFormProvider";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const NewJobButton = () => {
  const { setMode, setOpen } = useJobsFormContext();

  const handleOnClick = () => {
    setMode("create");
    setOpen(true);
  };

  return (
    <Button
      id="new-change-order-button"
      onClick={handleOnClick}
      variant="contained"
    >
      New Job
    </Button>
  );
};

export default NewJobButton;
