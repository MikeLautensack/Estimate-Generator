"use server";

import DIContainer from "@/core/IoCContainer";
import { PriceSelect } from "@/db/schemas/stripe";

const StripeUseCases = DIContainer.stripeUseCases;

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

export async function checkoutWithStripe(
  price: PriceSelect,
  redirectPath: string = "/account",
): Promise<CheckoutResponse> {
  return await StripeUseCases.checkoutWithStripe(price, redirectPath);
}

export async function createStripePortal(currentPath: string) {
  return await StripeUseCases.createStripePortal(currentPath);
}
