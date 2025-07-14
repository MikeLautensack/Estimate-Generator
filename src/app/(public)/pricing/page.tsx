import React from "react";
import { Box, Typography } from "@mui/material";
import Pricing from "@/components/stripe/Pricing";
import DIContainer from "@/core/DIContainer";

export default async function Page() {
  const [user, products, subscription] =
    await DIContainer.stripeUseCases.getPricePageData();
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "bg",
        py: 6,
      }}
    >
      <Pricing user={user} products={products} subscription={subscription} />
    </Box>
  );
}
