import React from "react";
import Heading from "./Heading";
import Box from "@mui/material/Box";
import HeaderNavContainer from "./HeaderNavContainer";
import DIContainer from "@/core/DIContainer";
import { cookies } from "next/headers";

const Header = async () => {
  // Get session
  const cookie = await cookies();
  const session = await DIContainer.authUseCases.getSession(cookie);
  // const profile = await getProfile(session!);

  return (
    <Box
      className="flex px-4 justify-between items-center h-14 sticky w-full z-10 top-0"
      component="div"
      sx={{
        backgroundColor: "surfaceContainer",
        borderBottom: "solid 1px",
        borderColor: "outlineVariant",
      }}
    >
      <Heading session={session!} />
      <HeaderNavContainer session={session!} profile={[]} />
    </Box>
  );
};

export default Header;
