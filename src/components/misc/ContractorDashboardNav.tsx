import React from "react";
import AccountMenu from "./AccountMenu";
import NotificationsMenu from "./NotificationsMenu";

const ContractorDashboardNav = () => {
  return (
    <div
      id="contractor-dashboard-nav"
      className="flex justify-center items-center gap-4"
    >
      <NotificationsMenu />
      <AccountMenu />
    </div>
  );
};

export default ContractorDashboardNav;
