import React from "react";
import AccountMenu from "./AccountMenu";
import NotificationsMenu from "./NotificationsMenu";
import DarkModeSwitch from "./DarkModeSwitch";

const UserNav = () => {
  return (
    <div
      id="contractor-dashboard-nav"
      className="flex justify-center items-center gap-2"
    >
      {/* <NotificationsMenu /> */}
      <AccountMenu />
      <DarkModeSwitch />
    </div>
  );
};

export default UserNav;
