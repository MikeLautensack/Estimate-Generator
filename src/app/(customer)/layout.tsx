import "../globals.css";
import React from "react";

export default function CustomerLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="desktop:flex flex-1 bg-primary600 min-h-screen"
    >
      {children}
    </div>
  );
}