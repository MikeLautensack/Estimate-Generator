import Stripe from "stripe";
import { IStripeUseCases } from "../interfaces/use-cases/IStripeUseCases";
import { ISupabaseService } from "../interfaces/services/ISupabaseService";
import { IStripeService } from "../interfaces/services/IStripeService";
import {
  calculateTrialEndUnixTimestamp,
  getErrorRedirect,
  getURL,
} from "@/utils/stripe/helpers";
import { IStripeRepository } from "../interfaces/repositories/IStripeRepository";
import { PriceSelect, SubscriptionsSelect } from "@/db/schemas/stripe";
import { SupabaseClient } from "@supabase/supabase-js";

export class StripeUseCases implements IStripeUseCases {
  private adminClient: SupabaseClient;

  constructor(
    private readonly stripeRepository: IStripeRepository,
    private readonly stripeService: IStripeService,
    private readonly supabaseService: ISupabaseService,
  ) {
    this.adminClient = supabaseService.getAdminClient();
  }

  getStripe(): Stripe {
    return this.stripeService.stripe;
  }

  async checkoutWithStripe(
    price: PriceSelect,
    redirectPath: string,
  ): Promise<{ errorRedirect?: string; sessionId?: string }> {
    try {
      // Get the user from Supabase auth
      const supabase = await this.supabaseService.getServerClient();
      const {
        error,
        data: { user },
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error(error);
        throw new Error("Could not get user session.");
      }

      // Retrieve or create the customer in Stripe
      let customer: string;
      try {
        customer = await this.stripeRepository.createOrRetrieveCustomer(
          user?.email || "",
          user?.id || "",
          this.adminClient,
          this.stripeService.stripe,
        );
      } catch (err) {
        console.error(err);
        throw new Error("Unable to access customer record.");
      }

      let params: Stripe.Checkout.SessionCreateParams = {
        allow_promotion_codes: true,
        billing_address_collection: "required",
        customer,
        customer_update: {
          address: "auto",
        },
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        cancel_url: getURL(),
        success_url: getURL(redirectPath),
      };

      console.log(
        "Trial end:",
        calculateTrialEndUnixTimestamp(price.trialPeriodDays),
      );

      if (price.type === "recurring") {
        params = {
          ...params,
          mode: "subscription",
          subscription_data: {
            trial_end: calculateTrialEndUnixTimestamp(price.trialPeriodDays),
          },
        };
      } else if (price.type === "one_time") {
        params = {
          ...params,
          mode: "payment",
        };
      }

      // Create a checkout session in Stripe
      let session;
      try {
        session =
          await this.stripeService.stripe.checkout.sessions.create(params);
      } catch (err) {
        console.error(err);
        throw new Error("Unable to create checkout session.");
      }

      // Instead of returning a Response, just return the data or error.
      if (session) {
        return { sessionId: session.id };
      } else {
        throw new Error("Unable to create checkout session.");
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorRedirect: getErrorRedirect(
            redirectPath,
            error.message,
            "Please try again later or contact a system administrator.",
          ),
        };
      } else {
        return {
          errorRedirect: getErrorRedirect(
            redirectPath,
            "An unknown error occurred.",
            "Please try again later or contact a system administrator.",
          ),
        };
      }
    }
  }

  async createStripePortal(currentPath: string): Promise<string> {
    try {
      const supabase = await this.supabaseService.getServerClient();
      const {
        error,
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (error) {
          console.error(error);
        }
        throw new Error("Could not get user session.");
      }

      let customer;
      try {
        customer = await this.stripeRepository.createOrRetrieveCustomer(
          user.email || "",
          user.id || "",
          this.adminClient,
          this.stripeService.stripe,
        );
      } catch (err) {
        console.error(err);
        throw new Error("Unable to access customer record.");
      }

      if (!customer) {
        throw new Error("Could not get customer.");
      }

      try {
        const { url } =
          await this.stripeService.stripe.billingPortal.sessions.create({
            customer,
            return_url: getURL("/account"),
          });
        if (!url) {
          throw new Error("Could not create billing portal");
        }
        return url;
      } catch (err) {
        console.error(err);
        throw new Error("Could not create billing portal");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        return getErrorRedirect(
          currentPath,
          error.message,
          "Please try again later or contact a system administrator.",
        );
      } else {
        return getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator.",
        );
      }
    }
  }

  async upsertProductRecord(product: Stripe.Product): Promise<void> {
    await this.stripeRepository.upsertProductRecord(product, this.adminClient);
  }

  async upsertPriceRecord(
    price: Stripe.Price,
    retryCount: number,
    maxRetries: number,
  ): Promise<void> {
    await this.stripeRepository.upsertPriceRecord(
      price,
      retryCount,
      maxRetries,
      this.adminClient,
    );
  }

  async deleteProductRecord(product: Stripe.Product): Promise<void> {
    await this.stripeRepository.deleteProductRecord(product, this.adminClient);
  }

  async deletePriceRecord(price: Stripe.Price): Promise<void> {
    await this.stripeRepository.deletePriceRecord(price, this.adminClient);
  }

  async upsertCustomerToSupabase(
    uuid: string,
    customerId: string,
  ): Promise<string> {
    return await this.stripeRepository.upsertCustomerToSupabase(
      uuid,
      customerId,
      this.adminClient,
    );
  }

  async createCustomerInStripe(uuid: string, email: string): Promise<string> {
    return await this.stripeRepository.createCustomerInStripe(
      uuid,
      email,
      this.stripeService.stripe,
    );
  }

  createOrRetrieveCustomer(email: string, uuid: string): Promise<string> {
    return this.stripeRepository.createOrRetrieveCustomer(
      email,
      uuid,
      this.adminClient,
      this.stripeService.stripe,
    );
  }

  async copyBillingDetailsToCustomer(
    uuid: string,
    payment_method: Stripe.PaymentMethod,
  ): Promise<void> {
    await this.stripeRepository.copyBillingDetailsToCustomer(
      uuid,
      payment_method,
      this.adminClient,
    );
  }

  async manageSubscriptionStatusChange(
    subscriptionId: string,
    customerId: string,
    createAction: boolean,
  ): Promise<void> {
    await this.stripeRepository.manageSubscriptionStatusChange(
      subscriptionId,
      customerId,
      createAction,
      this.adminClient,
      this.stripeService.stripe,
    );
  }

  async getPricePageData(): Promise<any> {
    const supabase = await this.supabaseService.getServerClient();
    return await Promise.all([
      this.supabaseService.getUser(supabase),
      this.stripeRepository.getProducts(),
      this.stripeRepository.getSubscriptionWithPricesAndProducts(supabase),
    ]);
  }

  async getUserSubscription(): Promise<SubscriptionsSelect | undefined> {
    const supabase = await this.supabaseService.getServerClient();
    const user = await this.supabaseService.getUser(supabase);
    if (!user) return undefined;
    return this.stripeRepository.getUserSubscription(user);
  }
}
