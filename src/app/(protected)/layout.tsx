import DIContainer from "@/core/DIContainer";
import "../globals.css";
import React from "react";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect Page
  const { data, error } = await DIContainer.authUseCases.getUser();
  if (error || !data) redirect("/signin");
  return <div className="">{children}</div>;
}
