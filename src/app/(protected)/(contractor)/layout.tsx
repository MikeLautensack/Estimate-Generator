import React from "react";
import ContractorAppHeader from "@/components/misc/ContractorAppHeader";

export default function ContractorAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <ContractorAppHeader />
      {children}
    </div>
  );
}
