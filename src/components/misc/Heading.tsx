"use client";

import { formatCapitalize } from "@/utils/formatingFunctions";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Typography } from "@mui/material";

type HeadingProps = {
  session: Session;
};
const Heading = ({ session }: HeadingProps) => {
  // Hooks
  const pathname = usePathname();

  // State
  const [heading, setHeading] = useState<string>("Estimate Generator");

  // Values
  const name = useMemo(
    () => formatCapitalize(session?.user.name),
    [session?.user.name],
  );
  const role = useMemo(
    () => formatCapitalize(session?.user.role),
    [session?.user.role],
  );

  // Effects
  useEffect(() => {
    if (session) {
      setHeading(`${name}'s ${role} Dashboard`);
    }
    if (pathname === "/" || !session) {
      setHeading("Estimate Generator");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return <Typography color="primary">{heading}</Typography>;
};

export default Heading;
