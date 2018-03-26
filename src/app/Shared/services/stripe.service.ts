import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StripeService {

  constructor(private http: HttpClient) { }

  // Send Stripe token to server
  sendToken(chargeAmount: number, token: string) {
    return this.http.post('http://localhost:3000/api/payment/charge', { amount: chargeAmount, stripeToken: token });
  }

}
