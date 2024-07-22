"use client";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React, { useCallback } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Customers } from "@/types/customers";
import { useRouter } from "next/navigation";

type ContractorsCustomersTableMenuProps = {
  customer: Customers;
};

const ContractorsCustomersTableMenu = ({
  customer,
}: ContractorsCustomersTableMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const deleteCustomer = useCallback(async () => {
    const USER_ID = customer.contractor_user_id;
    const CUSTOMER_ID = customer.id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/users/${USER_ID}/customers/${CUSTOMER_ID}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      router.refresh();
    }
  }, [customer.contractor_user_id, customer.id, router]);
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
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/customers/${customer.id}`}
        >
          <MenuItem onClick={handleClose}>View Customer</MenuItem>
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/customers/form/${customer.id}`}
        >
          <MenuItem onClick={handleClose}>Edit Customer</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            deleteCustomer();
            handleClose();
          }}
        >
          Delete Customer
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ContractorsCustomersTableMenu;
