import React from "react";
import Heading from "./Heading";
import Box from "@mui/material/Box";
import HeaderNavContainer from "./HeaderNavContainer";
import DIContainer from "@/core/IoCContainer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ContractorAppHeader = async () => {
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
      <h1>Contractor App Header</h1>
      {/* <Heading data={data!} />
      <HeaderNavContainer data={data!} profile={[]} /> */}
    </Box>
  );
};

export default ContractorAppHeader;
