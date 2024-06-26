import React from "react";
import Heading from "./Heading";
import { auth } from "../../../auth";
import HomeHeaderNav from "./HomeHeaderNav";
import UserNav from "./UserNav";
import Box from "@mui/material/Box";
import HeaderNavContainer from "./HeaderNavContainer";

const Header = async () => {
  // Get session
  const session = await auth();

  return (
    <Box
      className="flex px-8 justify-between items-center h-14 border-b border-gray-400"
      component="div"
    >
      <Heading session={session!} />
      <HeaderNavContainer session={session!} />
    </Box>
  );
};

export default Header;
