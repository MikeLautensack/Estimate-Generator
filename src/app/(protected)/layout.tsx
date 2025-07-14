import DIContainer from "@/core/DIContainer";
import "../globals.css";
import React from "react";
import { redirect } from "next/navigation";
import { QueryProvider } from "@/contexts/QueryProvider";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await DIContainer.authUseCases.getUser();
  if (!user) redirect("/signin");
  return (
    <div className="">
      <QueryProvider>{children}</QueryProvider>
    </div>
  );
}
