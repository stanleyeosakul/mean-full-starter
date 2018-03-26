/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Stripe API
declare var StripeCheckout: any;