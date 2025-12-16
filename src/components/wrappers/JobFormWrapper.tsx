"use client";

import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import JobForm from "../forms/job-form/JobForm";
import { useJobsFormContext } from "@/contexts/JobsFormProvider";

type JobFormWrapperProps = {
  children: React.ReactNode;
};

const JobFormWrapper = ({ children }: JobFormWrapperProps) => {
  // Hooks
  const { mode, open, setOpen } = useJobsFormContext();

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <div onClick={handleOpenModal}>{children}</div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="job-form-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          <JobForm
            mode={mode}
            isModalOpen={open}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        </Box>
      </Modal>
    </>
  );
};

export default JobFormWrapper;
