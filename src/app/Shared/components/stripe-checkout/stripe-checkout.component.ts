import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { StripeService } from '../../services/stripe.service';
declare var StripeCheckout: any;

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styles: []
})
export class StripeCheckoutComponent implements OnInit {
  // Stripe handler
  handler: any;

  // Amount of money to charge (in USD)
  total = 5;

  // Show payment result variables
  showResultScreen: boolean;
  paymentResult: boolean;
  message: string;

  constructor(private stripe: StripeService, @Inject(PLATFORM_ID) private platformId) {}

  ngOnInit() {
    // Run this only if in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Configure Stripe Checkout
      this.handler = StripeCheckout.configure({
        key: environment.stripeKey,
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: stripeToken => {
          this.stripe.sendToken(this.total, stripeToken).subscribe((data: any) => {
            // Get JSON response from the server
            this.paymentResult = data.success;
            this.message = data.message;

            // Show payment result screen for 2 seconds
            this.showResultScreen = true;
            setTimeout(() => (this.showResultScreen = false), 2000);
          });
        }
      });
    }
  }

  // Checkout with Stripe API
  checkout() {
    this.handler.open({
      name: 'MEANkit.io',
      description: 'See guide to test system',
      amount: this.total * 100
    });
  }
}
