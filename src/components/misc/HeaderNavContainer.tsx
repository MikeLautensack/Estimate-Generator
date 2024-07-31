"use client";

import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import UserNav from "./UserNav";
import HomeHeaderNav from "./HomeHeaderNav";
import { usePathname } from "next/navigation";

type HeaderNavContainerProps = {
  session: Session;
  profile: any;
};

const HeaderNavContainer = ({ session, profile }: HeaderNavContainerProps) => {
  // Hooks
  const pathname = usePathname();

  // State
  const [nav, setNav] = useState<React.ReactNode | null>(null);

  // Effects
  useEffect(() => {
    if (
      !session ||
      pathname === "/" ||
      pathname === "/signin" ||
      pathname === "/signup"
    ) {
      setNav(<HomeHeaderNav />);
    } else {
      setNav(<UserNav session={session} profile={profile} />);
    }
  }, [session, pathname, profile]);

  return <div>{nav}</div>;
};

export default HeaderNavContainer;
