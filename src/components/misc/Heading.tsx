"use client";

import { formatCapitalize } from "@/utils/formatingFunctions";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";

type HeadingProps = {
  data: any;
};

const Heading = ({ data }: HeadingProps) => {
  // Hooks
  const pathname = usePathname();

  // State
  const [heading, setHeading] = useState<string>("Estimate Generator");

  // Values
  const name = useMemo(
    () => formatCapitalize(data?.user.name),
    [data?.user.name],
  );
  const role = useMemo(
    () => formatCapitalize(data?.user.role),
    [data?.user.role],
  );

  // Effects
  useEffect(() => {
    if (data) {
      setHeading(`${name}'s ${role} Dashboard`);
    }
    if (
      pathname === "/" ||
      pathname === "/signin" ||
      pathname === "/signup" ||
      !data
    ) {
      setHeading("Estimate Generator");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Typography
      color="primary"
      sx={{
        fontSize: {
          xs: "0.875rem",
          sm: "1rem",
          md: "1.25rem",
        },
        lineHeight: {
          xs: 1.43,
          sm: 1.5,
          md: 1.6,
        },
        fontWeight: {
          xs: 400,
          sm: 400,
          md: 500,
        },
      }}
    >
      {heading}
    </Typography>
  );
};

export default Heading;
