import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-jwt-auth',
  templateUrl: './jwt-auth.component.html',
  styles: []
})
export class JwtAuthComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Authentication with JWT',
      'Guide to setting up authentication with JSON Web Tokens (JWT) with the MEAN stack full starter template',
      'article',
      'https://www.meankit.io/guides/authentication-with-jwt'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
