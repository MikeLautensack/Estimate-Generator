import React from "react";
import Heading from "./Heading";
import { auth } from "../../../auth";
import Box from "@mui/material/Box";
import HeaderNavContainer from "./HeaderNavContainer";
import { Session } from "next-auth";
import { db } from "@/db";
import { profiles } from "@/db/schemas/userProfile";
import { eq } from "drizzle-orm";

const getProfile = async (session: Session) => {
  const res = await db
    .select()
    .from(profiles)
    .where(eq(profiles.user_id, session.user?.id));
  return res;
};

const Header = async () => {
  // Get session
  const session = await auth();
  const profile = await getProfile(session!);

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
      <HeaderNavContainer session={session!} profile={profile} />
    </Box>
  );
};

export default Header;
