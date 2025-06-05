"use client";

import { signOut } from "../../../supabase/client";
import SideBarNav from "./SideBarNav";
import { Box, Button, Typography } from "@mui/material";

const SideBar = () => {
  return (
    <Box
      component="div"
      className="flex flex-col justify-between w-64 p-4 h-[calc(100vh-56px)] sticky top-14"
      sx={{
        backgroundColor: "surfaceContainer",
        borderRight: "solid 1px",
        borderColor: "outlineVariant",
        display: {
          xs: "none",
          lg: "flex",
        },
      }}
    >
      <div className="flex flex-col w-full gap-8">
        <Typography color="primary" className="">
          Estimate Generator
        </Typography>
        <SideBarNav className="" />
      </div>
      <Button onClick={() => signOut()} variant="contained">
        Sign Out
      </Button>
    </Box>
  );
};

export default SideBar;
