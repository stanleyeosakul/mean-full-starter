import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-stripe-api',
  templateUrl: './stripe-api.component.html',
  styles: []
})
export class StripeApiComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Stripe Payment API Integration',
      'Guide to setting up Stripe in the MEAN Stack full starter template',
      'article',
      'https://www.meankit.io/guides/stripe-payment-api-integration'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
