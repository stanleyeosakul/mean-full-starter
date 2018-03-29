import { Request, Response } from 'express';
import * as Stripe from 'stripe';
import { coreConfig } from '../config/keys';

export class StripeController {
  private readonly stripeInstance: Stripe;

  constructor() {
    this.stripeInstance = new Stripe(coreConfig.stripe.apiKey);
  }

  async charge(req: Request, res: Response): Promise<Response> {
    const { stripeToken } = req.body;

    // Multiply charge by 100 (Stripe thinks a value of 1 is equal to $0.01)
    const chargeAmount = Math.round(req.body.amount * 100);

    try {
      const newCustomer: Stripe.customers.ICustomer = await this.stripeInstance.customers.create({});
      const newSource: Stripe.cards.ICard = await this.stripeInstance.customers.createSource(newCustomer.id, {
        source: stripeToken.id
      });

      await this.stripeInstance.charges.create({
        amount: chargeAmount,
        currency: 'usd',
        customer: newSource.customer as string
      });

      return res.status(200).json({
        success: true,
        message: 'Payment successful!'
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred.  Charge not completed.'
      });
    }
  }
}
