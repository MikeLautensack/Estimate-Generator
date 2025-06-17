import PublicHeader from "@/components/misc/PublicHeader";
import "../globals.css";
import React from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <PublicHeader />
      {children}
    </div>
  );
}
