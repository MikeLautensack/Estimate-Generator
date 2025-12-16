import { Box } from "@mui/material";
import React from "react";

const PublicHeader = () => {
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
      <h1>Public Header</h1>
      {/* <Heading data={data!} />
      <HeaderNavContainer data={data!} profile={[]} /> */}
    </Box>
  );
};

export default PublicHeader;
