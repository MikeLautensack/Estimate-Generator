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
  const pathname = usePathname();

  // State
  const [selected, setSelected] = useState<string>("dashboard");

  // Effects
  useEffect(() => {
    const routeMap = [
      { baseRoute: "/contractor-dashboard/customers", state: "customers" },
      { baseRoute: "/contractor-dashboard/estimates", state: "estimates" },
      {
        baseRoute: "/contractor-dashboard/change-orders",
        state: "change-orders",
      },
      { baseRoute: "/contractor-dashboard/profile", state: "profile" },
      { baseRoute: "/contractor-dashboard/account", state: "account" },
      { baseRoute: "/contractor-dashboard/settings", state: "settings" },
      { baseRoute: "/contractor-dashboard", state: "dashboard" },
    ];

    for (const { baseRoute, state } of routeMap) {
      if (pathname.startsWith(baseRoute)) {
        setSelected(state);
        break; // Exit the loop once a match is found
      }
    }
  }, [pathname]);

  return (
    <nav {...props} className="flex flex-col gap-2">
      <div className="flex justify-center items-center gap-2">
        <Link
          id="dashboard-button"
          href="/contractor-dashboard/profile"
          onClick={() => setSelected("profile")}
        >
          <Button
            variant={selected === "profile" ? "contained" : "text"}
            fullWidth
          >
            <BsPerson className="text-secondary800" />
          </Button>
        </Link>
        <Link
          id="dashboard-button"
          href="/contractor-dashboard/account"
          onClick={() => setSelected("account")}
        >
          <Button
            variant={selected === "account" ? "contained" : "text"}
            fullWidth
          >
            <LuLayoutDashboard className="text-secondary500" />
          </Button>
        </Link>
        <Link
          id="dashboard-button"
          href="/contractor-dashboard/settings"
          onClick={() => setSelected("settings")}
        >
          <Button
            variant={selected === "settings" ? "contained" : "text"}
            fullWidth
          >
            <FcSettings />
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          id="dashboard-button"
          href="/contractor-dashboard"
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
        <Link
          id="customers-button"
          href="/contractor-dashboard/customers"
          onClick={() => setSelected("customers")}
        >
          <Button
            variant={selected === "customers" ? "contained" : "text"}
            fullWidth
            sx={{ justifyContent: "left", gap: ".5rem" }}
          >
            <BsFilePerson className="text-secondary500" />
            Customers
          </Button>
        </Link>
        <Link
          id="estimates-button"
          href="/contractor-dashboard/estimates"
          onClick={() => setSelected("estimates")}
        >
          <Button
            variant={selected === "estimates" ? "contained" : "text"}
            fullWidth
            sx={{ justifyContent: "left", gap: ".5rem" }}
          >
            <FcDocument />
            Estimates
          </Button>
        </Link>
        <Link
          id="estimates-button"
          href="/contractor-dashboard/change-orders"
          onClick={() => setSelected("change-orders")}
        >
          <Button
            variant={selected === "change-orders" ? "contained" : "text"}
            fullWidth
            sx={{ justifyContent: "left", gap: ".5rem" }}
          >
            <FcDocument />
            Change Orders
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default SideBarNav;
