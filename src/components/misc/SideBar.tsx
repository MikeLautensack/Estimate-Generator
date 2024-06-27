"use client";

import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { signOut } from "next-auth/react";
import SideBarNav from "./SideBarNav";
import { Button, Typography } from "@mui/material";

const SideBar = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div className="flex flex-col justify-between w-64 p-4 h-[calc(100vh-56px)] border-r border-gray-400">
      <div className="flex flex-col w-full gap-8">
        <Typography color="primary" className="">
          Estimate Generator
        </Typography>
        <SideBarNav className="" />
      </div>
      <Button
        onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_HOST })}
        variant="contained"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SideBar;
