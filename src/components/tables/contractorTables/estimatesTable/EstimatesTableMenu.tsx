"use client";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useCallback } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { Estimates } from "@/types/estimates";
import { useRouter } from "next/navigation";

type EstimatesTableMenuProps = {
  estimate: Estimates;
};

const EstimatesTableMenu = ({ estimate }: EstimatesTableMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const deleteEstimate = useCallback(async () => {
    const USER_ID = estimate.contractor_user_id;
    const CUSTOMER_ID = estimate.customer_id;
    const ESTIMATE_ID = estimate.id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      router.refresh();
    }
  }, [estimate.contractor_user_id, estimate.customer_id, estimate.id, router]);
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
        <Link href={`contractor-dashboard/estimates/${estimate.id}`}>
          <MenuItem onClick={handleClose}>View Estimate</MenuItem>
        </Link>
        <Link href={`contractor-dashboard/estimates/form/${estimate.id}`}>
          <MenuItem onClick={handleClose}>Edit Estimate</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            deleteEstimate();
            handleClose();
          }}
        >
          Delete Estimate
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default EstimatesTableMenu;
