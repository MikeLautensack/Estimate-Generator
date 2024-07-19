"use client";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

type TableMenuProps = {
  menuItems: MenuItem[];
};

type MenuItem = {
  id: number;
  name: string;
  link: string;
};

const TableMenu = ({ menuItems }: TableMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component="div" className="">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item) => (
          <Link key={item.id} href={item.link}>
            <MenuItem onClick={handleClose}>{item.name}</MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
};

export default TableMenu;
