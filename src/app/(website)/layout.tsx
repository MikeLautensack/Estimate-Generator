import "../globals.css";
import React from "react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">
      {children}
    </div>
  );
}