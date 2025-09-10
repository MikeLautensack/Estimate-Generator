import { PriceSelect, SubscriptionsSelect } from "@/db/schemas/stripe";
import Stripe from "stripe";

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

export interface IStripeUseCases {
  getStripe(): Stripe;
  checkoutWithStripe(
    price: PriceSelect,
    redirectPath: string,
  ): Promise<CheckoutResponse>;
  createStripePortal(currentPath: string): Promise<string>;
  upsertProductRecord(product: Stripe.Product): Promise<void>;
  upsertPriceRecord(
    price: Stripe.Price,
    retryCount: number,
    maxRetries: number,
  ): Promise<void>;
  deleteProductRecord(product: Stripe.Product): Promise<void>;
  deletePriceRecord(price: Stripe.Price): Promise<void>;
  upsertCustomerToSupabase(uuid: string, customerId: string): Promise<string>;
  createCustomerInStripe(uuid: string, email: string): Promise<string>;
  createOrRetrieveCustomer(email: string, uuid: string): Promise<string>;
  copyBillingDetailsToCustomer(
    uuid: string,
    payment_method: Stripe.PaymentMethod,
  ): Promise<void>;
  manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    createAction: boolean,
  ): Promise<void>;
  getPricePageData(): Promise<any>;
  getUserSubscription(): Promise<SubscriptionsSelect | undefined>;
  getSubscriptionWithPricesAndProducts(): Promise<any>;
}
