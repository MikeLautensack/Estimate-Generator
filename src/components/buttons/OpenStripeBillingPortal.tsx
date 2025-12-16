"use client";

import { createStripePortal } from "@/actions/stripe";
import { Button } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

const OpenStripeBillingPortal = () => {
  const router = useRouter();

  const handleOpenStripePortal = async () => {
    try {
      const currentPath = window.location.pathname;
      const url = await createStripePortal(currentPath);

      // If the URL starts with '/', it's an error redirect
      if (url.startsWith("/")) {
        router.push(url);
      } else {
        // Otherwise it's a Stripe portal URL
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error opening Stripe portal:", error);
    }
  };

  return (
    <Button variant="outlined" onClick={handleOpenStripePortal}>
      Open Stripe Billing Portal
    </Button>
  );
};

export default OpenStripeBillingPortal;
