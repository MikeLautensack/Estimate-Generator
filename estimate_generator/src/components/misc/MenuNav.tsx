"use client"

import React, { useEffect, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFilePerson } from "react-icons/bs";
import { FcDocument } from "react-icons/fc";
import Link from "next/link";

const MenuNav = ({ ...props }) => {

  const [ selected, setSelected ] = useState("dashboard");

  useEffect(() => {
    
  }, []);

  const changeSelected = (selected: string) => {
    setSelected(selected);
  };

  return (
    <nav 
        {...props}
    >
        <Link
            id="dashboard-button"
            className={`text-base font-medium flex gap-2 items-center py-1 px-2 ${selected === "dashboard" ? "bg-blue-500 text-white rounded" : ""}`}
            href="/contractor-dashboard"
            onClick={() => setSelected("dashboard")}
        >
            <LuLayoutDashboard className="text-secondary500"/>
            Dashboard
        </Link>
        <Link
            id="customers-button"
            className={`text-base font-medium flex gap-2 items-center py-1 px-2 ${selected === "customers" ? "bg-blue-500 text-white rounded" : ""}`}
            href=""
            onClick={() => setSelected("customers")}
        >
            <BsFilePerson className="text-secondary500"/>
            Customers
        </Link>
        <Link
            id="estimates-button"
            className={`text-base font-medium flex gap-2 items-center py-1 px-2 ${selected === "estimates" ? "bg-blue-500 text-white rounded" : ""}`}
            href="/contractor-dashboard/estimates"
            onClick={() => setSelected("estimates")}
        >
            <FcDocument />
            Estimates
        </Link>
        <Link
            id="estimates-button"
            className={`text-base font-medium flex gap-2 items-center py-1 px-2 ${selected === "change-orders" ? "bg-blue-500 text-white rounded" : ""}`}
            href="/contractor-dashboard/change-orders"
            onClick={() => setSelected("change-orders")}
        >
            <FcDocument />
            Change Orders
        </Link>
    </nav>
  );
}

export default MenuNav