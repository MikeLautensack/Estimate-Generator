import React from "react";
import Heading from "./Heading";
import { auth } from "../../../auth";
import HomeHeaderNav from "./HomeHeaderNav";
import ContractorDashboardNav from "./ContractorDashboardNav";

const Header = async () => {
  // Get session
  const session = await auth();

  return (
    <header className="flex px-8 justify-between items-center h-14">
      <Heading session={session!} />
      <div id="header-nav-container" className="">
        {session ? <ContractorDashboardNav /> : <HomeHeaderNav />}
      </div>
    </header>
  );
};

export default Header;
