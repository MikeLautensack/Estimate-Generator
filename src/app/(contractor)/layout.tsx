import "../globals.css";
import React from "react";
import SideBar from "../../components/misc/SideBar";

export default function ContractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col desktop:flex-row">
      <SideBar />
      {children}
    </div>
  );
}
