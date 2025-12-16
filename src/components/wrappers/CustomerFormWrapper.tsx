"use client";

import { Box, Modal } from "@mui/material";
import React from "react";
import CustomerForm from "../forms/customer-form/CustomerForm";
import { useCustomersFormContext } from "@/contexts/CustomersFormContext";

type CustomerFormWrapper = {
  children: React.ReactNode;
};

const CustomerFormWrapper = ({ children }: CustomerFormWrapper) => {
  // Hooks
  const { mode, open, setOpen } = useCustomersFormContext();

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
          <CustomerForm />
        </Box>
      </Modal>
    </>
  );
};

export default CustomerFormWrapper;
