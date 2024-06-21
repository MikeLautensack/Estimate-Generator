import React from "react";
import AuthButtonGroup from "./AuthButtonGroup";

type HomeHeaderNavProps = {};

const HomeHeaderNav = ({}: HomeHeaderNavProps) => {
  return (
    <nav>
      <AuthButtonGroup />
    </nav>
  );
};

export default HomeHeaderNav;
