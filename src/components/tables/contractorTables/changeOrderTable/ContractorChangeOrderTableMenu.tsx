"use client";

import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChangeOrder } from "@/types/changeOrders";

type ContractorsCustomersTableMenuProps = {
  changeOrder: ChangeOrder;
};

const ContractorChangeOrderTableMenu = ({
  changeOrder,
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
    const USER_ID = changeOrder.contractor_user_id;
    const CUSTOMER_ID = changeOrder.id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}api/users/${USER_ID}/customers/${CUSTOMER_ID}`,
      {
        method: "DELETE",
      },
    );

    if (res.ok) {
      router.refresh();
    }
  }, [changeOrder.contractor_user_id, changeOrder.id, router]);
  return (
    <Box component="div" className="">
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
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
          href={`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/chnage-orders/${changeOrder.id}`}
        >
          <MenuItem onClick={handleClose}>View Change Order</MenuItem>
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/chnage-orders/form/${changeOrder.id}`}
        >
          <MenuItem onClick={handleClose}>Update Change Order</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            deleteCustomer();
            handleClose();
          }}
        >
          Delete Change Order
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ContractorChangeOrderTableMenu;
