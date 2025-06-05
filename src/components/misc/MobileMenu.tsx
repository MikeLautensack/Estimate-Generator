"use client";

import { Button, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SideBarNav from "./SideBarNav";
import CustomerSideBarNav from "./CustomerSideBarNav";
import { signOut } from "../../../supabase/client";

type MobileMenuProps = {
  session: any;
};

const MobileMenu = ({ session }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  return (
    <Box component="div">
      <Button onClick={() => setOpen(true)}>
        <MenuIcon />
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor={"right"}
        sx={{ padding: "1rem", position: "relative" }}
      >
        <Box
          component="div"
          className="flex flex-col justify-between items-start w-64 p-4 h-full gap-4"
        >
          <Box component="div" className="absolute top-0 right-0">
            <Button onClick={() => setOpen(false)}>
              <MenuIcon />
            </Button>
          </Box>
          <div className="flex flex-col w-full gap-4">
            <Typography color="primary" className="">
              Estimate Generator
            </Typography>
            {session.user.role === "contractor" ? (
              <SideBarNav className="" />
            ) : (
              session.user.role === "customer" && <CustomerSideBarNav />
            )}
          </div>
          <Button onClick={handleLogout} variant="contained" className="w-full">
            Sign Out
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileMenu;
