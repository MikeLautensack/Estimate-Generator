import { CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <CircularProgress />
    </div>
  );
};

export default loading;
