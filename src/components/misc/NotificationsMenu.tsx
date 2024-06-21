import { Badge } from "@mui/material";
import React from "react";
import MailIcon from "@mui/icons-material/Mail";

const NotificationsMenu = () => {
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
};

export default NotificationsMenu;
