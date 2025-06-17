import React from "react";
import CustomerAppHeader from "@/components/misc/CustomerAppHeader";

export default function CustomerAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <CustomerAppHeader />
      {children}
    </div>
  );
}
