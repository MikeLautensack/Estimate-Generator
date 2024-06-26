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
        <div className="flex flex-col gap-8 w-full">
          <Typography color="primary" className="">
            Estimate Generator
          </Typography>
          <nav className="flex justify-center items-center">
            <Link id="profile-button" href="/settings/profile">
              <Button variant="text">
                <BsPerson className="text-secondary800" />
              </Button>
            </Link>
            <Link id="settings-button" href="/settings/account">
              <Button variant="text">
                <FcSettings />
              </Button>
            </Link>
            <Link href="/notifications">
              <Button variant="text" id="notifications-button">
                <IoMdNotificationsOutline className="text-secondary500" />
              </Button>
            </Link>
          </nav>
        </div>
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
