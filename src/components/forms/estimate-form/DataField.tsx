import { Box, Typography } from "@mui/material";
import React from "react";

type DataFieldProp = {
  name: string;
  val: string;
};

const DataField = ({ name, val }: DataFieldProp) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="primary">{`${name}: `}</Typography>
      <Typography variant="body2" color="primary">
        {val}
      </Typography>
    </Box>
  );
};

export default DataField;
