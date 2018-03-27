import { StripeController } from '../controllers/StripeController';
import { Router } from 'express';

export class PaymentRouter {
  private readonly stripeController: StripeController;
  router: Router;

  constructor() {
    this.router = Router();
    this.stripeController = new StripeController();
    this.routes();
  }

  private routes() {
    this.router.post('/charge', this.stripeController.charge);
  }
}
