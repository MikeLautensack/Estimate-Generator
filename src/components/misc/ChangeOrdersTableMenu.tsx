import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useCallback } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { ChangeOrder } from "@/types/changeOrders";
import Link from "next/link";

type ChangeOrdersTableMenuProps = {
  order: ChangeOrder;
};

const ChangeOrdersTableMenu = ({ order }: ChangeOrdersTableMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markCompleted = useCallback(async (order: ChangeOrder) => {
    const USER_ID = order.contractor_user_id;
    const CUSTOMER_ID = order.customer_id;
    const ESTIMATE_ID = order.estimate_id;
    const CHANGE_ORDERS_ID = order.id;
    await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${CHANGE_ORDERS_ID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      },
    );
  }, []);

  const markRejected = useCallback(async (order: ChangeOrder) => {
    const USER_ID = order.contractor_user_id;
    const CUSTOMER_ID = order.customer_id;
    const ESTIMATE_ID = order.estimate_id;
    const CHANGE_ORDERS_ID = order.id;
    await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/${USER_ID}/customers/${CUSTOMER_ID}/estimates/${ESTIMATE_ID}/change-orders/${CHANGE_ORDERS_ID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Rejected",
        }),
      },
    );
  }, []);

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
          href={`${process.env.NEXT_PUBLIC_HOST}contractor-dashboard/change-orders/change-order/${order.id}`}
        >
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            View Change Order
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            markCompleted(order);
            handleClose();
          }}
        >
          Mark Completed
        </MenuItem>
        <MenuItem
          onClick={() => {
            markRejected(order);
            handleClose();
          }}
        >
          Mark Rejected
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ChangeOrdersTableMenu;
