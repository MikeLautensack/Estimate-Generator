import { IStripeService } from "@/core/application/interfaces/services/IStripeService";
import Stripe from "stripe";

export class StripeService implements IStripeService {
  stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? "",
      {
        // https://github.com/stripe/stripe-node#configuration
        // https://stripe.com/docs/api/versioning
        // @ts-ignore
        apiVersion: null,
        // Register this as an official Stripe plugin.
        // https://stripe.com/docs/building-plugins#setappinfo
        appInfo: {
          name: "Estimate Generator",
          version: "0.0.0",
          url: "https://github.com/MikeLautensack/Estimate-Generator",
        },
      },
    );
  }
}
