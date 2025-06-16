"use client";

import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import HomeHeaderNav from "./HomeHeaderNav";
import { usePathname } from "next/navigation";

type HeaderNavContainerProps = {
  data: any;
  profile: any;
};

const HeaderNavContainer = ({ data, profile }: HeaderNavContainerProps) => {
  // Hooks
  const pathname = usePathname();

  // State
  const [nav, setNav] = useState<React.ReactNode | null>(null);

  // Effects
  useEffect(() => {
    if (
      !data ||
      pathname === "/" ||
      pathname === "/signin" ||
      pathname === "/signup"
    ) {
      setNav(<HomeHeaderNav />);
    } else {
      setNav(<UserNav data={data} profile={profile} />);
    }
  }, [data, pathname, profile]);

  return <div>{nav}</div>;
};

export default HeaderNavContainer;
