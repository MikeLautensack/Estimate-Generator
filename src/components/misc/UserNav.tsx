import React from "react";
import AccountMenu from "./AccountMenu";
import DarkModeSwitch from "./DarkModeSwitch";
import { Box } from "@mui/system";
import MobileMenu from "./MobileMenu";
import { Session } from "next-auth";

type UserNavProps = {
  session: Session;
};

const UserNav = ({ session }: UserNavProps) => {
  console.log("testing session 1", session);
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
        {session.user.role === "contractor" && session && (
          <AccountMenu session={session} />
        )}
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
        <MobileMenu session={session} />
      </Box>
    </div>
  );
};

export default UserNav;
