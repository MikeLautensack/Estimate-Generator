import "../globals.css";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex h-[calc(100vh-56px)]">{children}</div>;
}
