import "../../globals.css";
import React from "react";

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
