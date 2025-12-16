"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const NewEstimateButton = () => {
  const router = useRouter();
  const onClick = async () => {
    const res = await fetch("/api/estimates", {
      method: "POST",
      body: null,
    });

    const { estimateId } = await res.json();

    router.push(`/contractor-dashboard/estimates/${estimateId}/edit`);
  };
  return (
    <Button onClick={onClick} id="new-change-order-button" variant="contained">
      New Estimate
    </Button>
  );
};

export default NewEstimateButton;
