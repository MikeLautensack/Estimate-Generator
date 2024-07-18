"use client";

import { Box, Typography } from "@mui/material";
import CustomerSideBarNav from "./CustomerSideBarNav";

const CustomerSideBar = () => {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: "surfaceContainer",
        borderRight: "solid 1px",
        borderColor: "outlineVariant",
        display: {
          xs: "none",
          lg: "flex",
        },
      }}
      className="flex flex-col justify-between w-64 p-4 h-[calc(100vh-56px)] sticky top-14"
    >
      <div className="flex flex-col w-full gap-8">
        <Typography color="primary" className="">
          Estimate Generator
        </Typography>
        <CustomerSideBarNav />
      </div>
    </Box>
  );
};

export default CustomerSideBar;
