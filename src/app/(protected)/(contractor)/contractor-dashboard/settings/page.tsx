import DarkModeSwitch from "@/components/misc/DarkModeSwitch";
import { Box, Card, Typography } from "@mui/material";
import React from "react";

const page = () => {
  return (
    <main className="p-4 min-h-[calc(100vh-56px)] flex flex-col justify-start items-start gap-4 flex-1">
      <Typography variant="h4" color="primary" className="">
        Settings
      </Typography>
      <Card
        sx={{ backgroundColor: "surfaceContainerLow" }}
        className="flex flex-col gap-4 justify-start items-start rounded-lg p-4 w-full h-full"
      >
        <Typography variant="h6" color="primary" className="">
          User Prefrences
        </Typography>
        <Box component="div" className="flex gap-4 justify-center items-center">
          <Typography variant="body1" color="primary" className="">
            Theme
          </Typography>
          <DarkModeSwitch />
        </Box>
      </Card>
    </main>
  );
};

export default page;
