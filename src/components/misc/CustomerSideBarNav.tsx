"use client";

import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFilePerson, BsPerson } from "react-icons/bs";
import { FcDocument, FcSettings } from "react-icons/fc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";

const SideBarNav = ({ ...props }) => {
  // Hooks
  //   const pathname = usePathname();

  // State
  const [selected, setSelected] = useState<string>("dashboard");

  // Effects
  //   useEffect(() => {
  //     const routeMap = [
  //       { baseRoute: "/contractor-dashboard/customers", state: "customers" },
  //       { baseRoute: "/contractor-dashboard/estimates", state: "estimates" },
  //       {
  //         baseRoute: "/contractor-dashboard/change-orders",
  //         state: "change-orders",
  //       },
  //       { baseRoute: "/contractor-dashboard/profile", state: "profile" },
  //       { baseRoute: "/contractor-dashboard/account", state: "account" },
  //       { baseRoute: "/contractor-dashboard/settings", state: "settings" },
  //       { baseRoute: "/contractor-dashboard", state: "dashboard" },
  //     ];

  //     for (const { baseRoute, state } of routeMap) {
  //       if (pathname.startsWith(baseRoute)) {
  //         setSelected(state);
  //         break; // Exit the loop once a match is found
  //       }
  //     }
  //   }, [pathname]);

  return (
    <nav {...props} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Link
          id="dashboard-button"
          href="/customer-dashboard"
          onClick={() => setSelected("dashboard")}
        >
          <Button
            variant={selected === "dashboard" ? "contained" : "text"}
            fullWidth
            sx={{ justifyContent: "left", gap: ".5rem" }}
          >
            <LuLayoutDashboard className="text-secondary500" />
            Dashboard
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default SideBarNav;
