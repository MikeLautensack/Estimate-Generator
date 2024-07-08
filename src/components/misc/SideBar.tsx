"use client";

import { useMediaQuery } from "react-responsive";
import { signOut } from "next-auth/react";
import SideBarNav from "./SideBarNav";
import { Box, Button, Typography } from "@mui/material";

const SideBar = () => {
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
        <SideBarNav className="" />
      </div>
      <Button
        onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_HOST })}
        variant="contained"
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default SideBar;
