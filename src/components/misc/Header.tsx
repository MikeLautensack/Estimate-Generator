import React from "react";
import Heading from "./Heading";
import { auth } from "../../../auth";
import HomeHeaderNav from "./HomeHeaderNav";
import ContractorDashboardNav from "./ContractorDashboardNav";
import Box from "@mui/material/Box";

const Header = async () => {
  // Get session
  const session = await auth();

  return (
    <Box
      className="flex px-8 justify-between items-center h-14"
      component="div"
    >
      <Heading session={session!} />
      <div id="header-nav-container" className="">
        {session ? <ContractorDashboardNav /> : <HomeHeaderNav />}
      </div>
    </Box>
  );
};

export default Header;
