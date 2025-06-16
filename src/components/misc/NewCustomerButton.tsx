"use client";

import { useCustomersFormContext } from "@/contexts/CustomersFormContext";
import { Button } from "@mui/material";
import React from "react";

const NewCustomerButton = () => {
  const { setMode, setOpen } = useCustomersFormContext();

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
      New Customer
    </Button>
  );
};

export default NewCustomerButton;
