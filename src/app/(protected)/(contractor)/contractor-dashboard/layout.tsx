import React from "react";
import ContractorAppHeader from "@/components/misc/ContractorAppHeader";
import Paywall from "@/components/stripe/Paywall";
import SideBar from "@/components/misc/SideBar";

export default function ContractorAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Paywall>
      <div className="flex flex-col h-screen">
        <ContractorAppHeader />
        <div className="flex flex-1 overflow-hidden">
          <SideBar />
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </Paywall>
  );
}
