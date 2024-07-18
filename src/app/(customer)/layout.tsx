import CustomerSideBar from "@/components/misc/CustomerSideBar";
import "../globals.css";
import React from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col desktop:flex-row">
      <CustomerSideBar />
      {children}
    </div>
  );
}
