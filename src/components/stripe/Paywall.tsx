import DIContainer from "@/core/DIContainer";
import { redirect } from "next/navigation";
import React from "react";

type PaywallProps = {
  children: React.ReactNode;
};

const Paywall = async ({ children }: PaywallProps) => {
  const subscription = await DIContainer.stripeUseCases.getUserSubscription();
  if (!subscription) redirect("/signin");
  const isActive =
    subscription.status === "trialing" || subscription.status === "active";
  const currentPeriodEnd = new Date(subscription.currentPeriodEnd);
  const now = new Date();
  if (!isActive || now > currentPeriodEnd) redirect("/pricing");

  return <div>{children}</div>;
};

export default Paywall;
