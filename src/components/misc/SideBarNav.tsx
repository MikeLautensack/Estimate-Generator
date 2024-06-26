"use client";

import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFilePerson } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
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
    if (pathname === "/contractor-dashboard") {
      setSelected("dashboard");
    } else if (pathname === "/contractor-dashboard/customers") {
      setSelected("customers");
    } else if (pathname === "/contractor-dashboard/estimates") {
      setSelected("estimates");
    } else if (pathname === "/contractor-dashboard/change-orders") {
      setSelected("change-orders");
    }
  }, [pathname]);

  return (
    <nav {...props} className="flex flex-col gap-2">
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
    </nav>
  );
};

export default SideBarNav;
