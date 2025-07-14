import Stripe from "stripe";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  ProductWithPrices,
  SubscriptionWithProduct,
} from "@/components/stripe/Pricing";
import { SubscriptionsSelect } from "@/db/schemas/stripe";

export interface IStripeRepository {
  upsertProductRecord(
    product: Stripe.Product,
    adminClient: SupabaseClient,
  ): Promise<void>;
  upsertPriceRecord(
    price: Stripe.Price,
    retryCount: number,
    maxRetries: number,
    adminClient: SupabaseClient,
  ): Promise<void>;
  deleteProductRecord(
    product: Stripe.Product,
    adminClient: SupabaseClient,
  ): Promise<void>;
  deletePriceRecord(
    price: Stripe.Price,
    adminClient: SupabaseClient,
  ): Promise<void>;
  upsertCustomerToSupabase(
    uuid: string,
    customerId: string,
    adminClient: SupabaseClient,
  ): Promise<string>;
  createCustomerInStripe(
    uuid: string,
    email: string,
    stripe: Stripe,
  ): Promise<string>;
  createOrRetrieveCustomer(
    email: string,
    uuid: string,
    adminClient: SupabaseClient,
    stripe: Stripe,
  ): Promise<string>;
  copyBillingDetailsToCustomer(
    uuid: string,
    payment_method: Stripe.PaymentMethod,
    adminClient: SupabaseClient,
  ): Promise<void>;
  manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    createAction: boolean,
    adminClient: SupabaseClient,
    stripe: Stripe,
  ): Promise<void>;
  getSubscriptionWithPricesAndProducts(
    supabase: SupabaseClient,
  ): Promise<SubscriptionWithProduct | null>;
  getProducts(): Promise<ProductWithPrices[]>;
  getUserSubscription(user: any): Promise<SubscriptionsSelect | undefined>;
}
