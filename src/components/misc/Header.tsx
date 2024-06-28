import React from "react";
import Heading from "./Heading";
import { auth } from "../../../auth";
import Box from "@mui/material/Box";
import HeaderNavContainer from "./HeaderNavContainer";

const Header = async () => {
  // Get session
  const session = await auth();

  return (
    <Box
      className="flex px-8 justify-between items-center h-14"
      component="div"
      sx={{
        backgroundColor: "surfaceContainer",
        borderBottom: "solid 1px",
        borderColor: "outlineVariant",
      }}
    >
      <Heading session={session!} />
      <HeaderNavContainer session={session!} />
    </Box>
  );
};

export default Header;
