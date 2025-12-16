"use client";

import { Button } from "@mui/material";
import React from "react";

const handleDeleteAccountClick = () => {
  console.log("testing");
};

const HandleDeleteAccount = () => {
  return (
    <Button variant="outlined" color="error" onClick={handleDeleteAccountClick}>
      Delete Account
    </Button>
  );
};

export default HandleDeleteAccount;
