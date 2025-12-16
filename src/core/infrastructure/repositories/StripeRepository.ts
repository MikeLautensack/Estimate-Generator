import { IStripeRepository } from "@/core/application/interfaces/repositories/IStripeRepository";
import Stripe from "stripe";
import {
  PriceInsert,
  ProductInsert,
  SubscriptionsInsert,
  products,
  prices,
  subscriptions,
  SubscriptionsSelect,
} from "@/db/schemas/stripe";
import { SupabaseClient } from "@supabase/supabase-js";
import { toDateTime } from "@/utils/stripe/helpers";
import {
  ProductWithPrices,
  SubscriptionWithProduct,
} from "@/components/stripe/Pricing";
import { db } from "@/db";
import { eq, and, inArray } from "drizzle-orm";

export class StripeRepository implements IStripeRepository {
  // Change to control trial period length
  TRIAL_PERIOD_DAYS: number = 0;

  async upsertProductRecord(
    product: Stripe.Product,
    adminClient: SupabaseClient,
  ): Promise<void> {
    const productData: ProductInsert = {
      id: product.id,
      active: product.active,
      name: product.name,
      description: product.description ?? null,
      image: product.images?.[0] ?? null,
      metadata: product.metadata,
    };

    const { error: upsertError } = await adminClient
      .from("products")
      .upsert([productData]);
    if (upsertError)
      throw new Error(`Product insert/update failed: ${upsertError.message}`);
    console.log(`Product inserted/updated: ${product.id}`);
  }

  async upsertPriceRecord(
    price: Stripe.Price,
    retryCount: number,
    maxRetries: number,
    adminClient: SupabaseClient,
  ): Promise<void> {
    const priceData = {
      id: price.id,
      product_id: typeof price.product === "string" ? price.product : "",
      active: price.active,
      currency: price.currency,
      type: price.type,
      unit_amount: price.unit_amount ?? null,
      interval: price.recurring?.interval ?? null,
      interval_count: price.recurring?.interval_count ?? null,
      trial_period_days:
        price.recurring?.trial_period_days ?? this.TRIAL_PERIOD_DAYS,
    };

    const { error: upsertError } = await adminClient
      .from("prices")
      .upsert([priceData]);

    if (upsertError?.message.includes("foreign key constraint")) {
      if (retryCount < maxRetries) {
        console.log(
          `Retry attempt ${retryCount + 1} for price ID: ${price.id}`,
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await this.upsertPriceRecord(
          price,
          retryCount + 1,
          maxRetries,
          adminClient,
        );
      } else {
        throw new Error(
          `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`,
        );
      }
    } else if (upsertError) {
      throw new Error(`Price insert/update failed: ${upsertError.message}`);
    } else {
      console.log(`Price inserted/updated: ${price.id}`);
    }
  }

  async deleteProductRecord(
    product: Stripe.Product,
    adminClient: SupabaseClient,
  ): Promise<void> {
    const { error: deletionError } = await adminClient
      .from("products")
      .delete()
      .eq("id", product.id);
    if (deletionError)
      throw new Error(`Product deletion failed: ${deletionError.message}`);
    console.log(`Product deleted: ${product.id}`);
  }

  async deletePriceRecord(
    price: Stripe.Price,
    adminClient: SupabaseClient,
  ): Promise<void> {
    const { error: deletionError } = await adminClient
      .from("prices")
      .delete()
      .eq("id", price.id);
    if (deletionError)
      throw new Error(`Price deletion failed: ${deletionError.message}`);
    console.log(`Price deleted: ${price.id}`);
  }

  async upsertCustomerToSupabase(
    uuid: string,
    customerId: string,
    adminClient: SupabaseClient,
  ): Promise<string> {
    const { error: upsertError } = await adminClient
      .from("customers")
      .upsert([{ id: uuid, stripe_customer_id: customerId }]);

    if (upsertError)
      throw new Error(
        `Supabase customer record creation failed: ${upsertError.message}`,
      );

    return customerId;
  }

  async createCustomerInStripe(
    uuid: string,
    email: string,
    stripe: Stripe,
  ): Promise<string> {
    const customerData = { metadata: { supabaseUUID: uuid }, email: email };
    const newCustomer = await stripe.customers.create(customerData);
    if (!newCustomer) throw new Error("Stripe customer creation failed.");

    return newCustomer.id;
  }

  async createOrRetrieveCustomer(
    email: string,
    uuid: string,
    adminClient: SupabaseClient,
    stripe: Stripe,
  ): Promise<string> {
    // Check if the customer already exists in Supabase
    const { data: existingSupabaseCustomer, error: queryError } =
      await adminClient
        .from("stripe_customers")
        .select("*")
        .eq("id", uuid)
        .maybeSingle();

    if (queryError) {
      throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
    }

    // Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
    let stripeCustomerId: string | undefined;
    if (existingSupabaseCustomer?.stripe_customer_id) {
      const existingStripeCustomer = await stripe.customers.retrieve(
        existingSupabaseCustomer.stripe_customer_id,
      );
      stripeCustomerId = existingStripeCustomer.id;
    } else {
      // If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
      const stripeCustomers = await stripe.customers.list({ email: email });
      stripeCustomerId =
        stripeCustomers.data.length > 0
          ? stripeCustomers.data[0].id
          : undefined;
    }

    // If still no stripeCustomerId, create a new customer in Stripe
    const stripeIdToInsert = stripeCustomerId
      ? stripeCustomerId
      : await this.createCustomerInStripe(uuid, email, stripe);
    if (!stripeIdToInsert) throw new Error("Stripe customer creation failed.");

    if (existingSupabaseCustomer && stripeCustomerId) {
      // If Supabase has a record but doesn't match Stripe, update Supabase record
      if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
        const { error: updateError } = await adminClient
          .from("stripe_customers")
          .update({ stripe_customer_id: stripeCustomerId })
          .eq("id", uuid);

        if (updateError)
          throw new Error(
            `Supabase customer record update failed: ${updateError.message}`,
          );
        console.warn(
          `Supabase customer record mismatched Stripe ID. Supabase record updated.`,
        );
      }
      // If Supabase has a record and matches Stripe, return Stripe customer ID
      return stripeCustomerId;
    } else {
      console.warn(
        `Supabase customer record was missing. A new record was created.`,
      );

      // If Supabase has no record, create a new record and return Stripe customer ID
      const upsertedStripeCustomer = await this.upsertCustomerToSupabase(
        uuid,
        stripeIdToInsert,
        adminClient,
      );
      if (!upsertedStripeCustomer)
        throw new Error("Supabase customer record creation failed.");

      return upsertedStripeCustomer;
    }
  }

  async copyBillingDetailsToCustomer(
    uuid: string,
    payment_method: Stripe.PaymentMethod,
    adminClient: SupabaseClient,
  ): Promise<void> {
    //Todo: check this assertion
    const customer = payment_method.customer as string;
    const { name, phone, address } = payment_method.billing_details;
    if (!name || !phone || !address) return;
    //@ts-ignore
    await stripe.customers.update(customer, { name, phone, address });
    const { error: updateError } = await adminClient
      .from("users")
      .update({
        billing_address: { ...address },
        payment_method: { ...payment_method[payment_method.type] },
      })
      .eq("id", uuid);
    if (updateError)
      throw new Error(`Customer update failed: ${updateError.message}`);
  }

  async manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    createAction: boolean,
    adminClient: SupabaseClient,
    stripe: Stripe,
  ): Promise<void> {
    // Get customer's UUID from mapping table.
    const { data: customerData, error: noCustomerError } = await adminClient
      .from("stripe_customers")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();

    if (noCustomerError)
      throw new Error(`Customer lookup failed: ${noCustomerError.message}`);

    const { id: uuid } = customerData!;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["default_payment_method"],
    });
    // Upsert the latest status of the subscription object.
    const subscriptionData = {
      id: subscription.id,
      user_id: uuid,
      metadata: subscription.metadata,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      //TODO check quantity on subscription
      // @ts-ignore
      quantity: subscription.quantity,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at
        ? toDateTime(subscription.cancel_at).toISOString()
        : null,
      canceled_at: subscription.canceled_at
        ? toDateTime(subscription.canceled_at).toISOString()
        : null,
      current_period_start: toDateTime(
        subscription.items.data[0].current_period_start,
      ).toISOString(),
      current_period_end: toDateTime(
        subscription.items.data[0].current_period_end,
      ).toISOString(),
      created: toDateTime(subscription.created).toISOString(),
      ended_at: subscription.ended_at
        ? toDateTime(subscription.ended_at).toISOString()
        : null,
      trial_start: subscription.trial_start
        ? toDateTime(subscription.trial_start).toISOString()
        : null,
      trial_end: subscription.trial_end
        ? toDateTime(subscription.trial_end).toISOString()
        : null,
    };

    const { error: upsertError } = await adminClient
      .from("subscriptions")
      .upsert([subscriptionData]);
    if (upsertError)
      throw new Error(
        `Subscription insert/update failed: ${upsertError.message}`,
      );

    console.log(
      `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`,
    );

    // For a new subscription copy the billing details to the customer object.
    // NOTE: This is a costly operation and should happen at the very end.
    if (createAction && subscription.default_payment_method && uuid)
      //@ts-ignore
      await this.copyBillingDetailsToCustomer(
        uuid,
        subscription.default_payment_method as Stripe.PaymentMethod,
      );
  }

  async getSubscriptionWithPricesAndProducts(
    supabase: SupabaseClient,
  ): Promise<SubscriptionWithProduct | null> {
    try {
      // Get the current user from Supabase auth
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return null;
      }

      // Use Drizzle ORM to query subscriptions with related data
      const subscriptionData = await db
        .select()
        .from(subscriptions)
        .leftJoin(prices, eq(subscriptions.priceId, prices.id))
        .leftJoin(products, eq(prices.productId, products.id))
        .where(
          and(
            eq(subscriptions.userId, user.id),
            inArray(subscriptions.status, ["trialing", "active"]),
          ),
        )
        .limit(1);

      if (subscriptionData.length === 0) {
        return null;
      }

      const subscription = subscriptionData[0];

      // Transform the data to match the expected SubscriptionWithProduct type
      const result: SubscriptionWithProduct = {
        ...subscription.subscriptions,
        prices: subscription.prices
          ? {
              ...subscription.prices,
              products: subscription.products,
            }
          : null,
      };

      return result;
    } catch (error) {
      console.error("Error fetching subscription:", error);
      return null;
    }
  }

  async getProducts(): Promise<ProductWithPrices[]> {
    try {
      // Use Drizzle ORM to query products with their prices
      const productsData = await db
        .select()
        .from(products)
        .leftJoin(prices, eq(products.id, prices.productId))
        .where(and(eq(products.active, true), eq(prices.active, true)))
        .orderBy(products.metadata, prices.unitAmount);

      // Group products with their prices
      const productsMap = new Map<string, ProductWithPrices>();

      for (const row of productsData) {
        const productId = row.products.id;

        if (!productsMap.has(productId)) {
          productsMap.set(productId, {
            ...row.products,
            prices: [],
          });
        }

        if (row.prices) {
          productsMap.get(productId)!.prices.push(row.prices);
        }
      }

      return Array.from(productsMap.values());
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async getUserSubscription(
    user: any,
  ): Promise<SubscriptionsSelect | undefined> {
    try {
      const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, user.id))
        .limit(1);

      return subscription;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
}
