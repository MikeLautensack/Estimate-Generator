import React from "react";
import AccountMenu from "./AccountMenu";
import DarkModeSwitch from "./DarkModeSwitch";
import { Box } from "@mui/system";
import MobileMenu from "./MobileMenu";

const UserNav = () => {
  return (
    <div
      id="contractor-dashboard-nav"
      className="flex justify-center items-center gap-2"
    >
      <Box
        component="div"
        className="flex justify-center items-center gap-2"
        sx={{
          display: {
            xs: "none",
            lg: "flex",
          },
        }}
      >
        {/* <NotificationsMenu /> */}
        <AccountMenu />
        <DarkModeSwitch />
      </Box>
      <Box
        component="div"
        className=""
        sx={{
          display: {
            xs: "flex",
            lg: "none",
          },
        }}
      >
        <MobileMenu />
      </Box>
    </div>
  );
};

export default UserNav;
