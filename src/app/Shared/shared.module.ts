import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ShareModule } from '@ngx-share/core';

import { HeroNavbarComponent } from './components/hero-navbar/hero-navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SocialButtonsComponent } from './components/social-buttons/social-buttons.component';
import { BooksBackComponent } from './components/books-back/books-back.component';
import { StripeCheckoutComponent } from './components/stripe-checkout/stripe-checkout.component';

import { SeoService } from './services/seo.service';
import { StripeService } from './services/stripe.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ShareModule.forRoot(),
  ],
  declarations: [
    HeroNavbarComponent,
    FooterComponent,
    SocialButtonsComponent,
    BooksBackComponent,
    StripeCheckoutComponent
  ],
  exports: [
    HeroNavbarComponent,
    FooterComponent,
    SocialButtonsComponent,
    BooksBackComponent,
    StripeCheckoutComponent
  ],
  providers: [
    AuthGuard,
    SeoService,
    StripeService
  ]
})
export class SharedModule { }
