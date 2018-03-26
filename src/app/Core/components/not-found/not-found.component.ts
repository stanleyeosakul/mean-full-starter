import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: [`
    .padding {
      padding: 10rem 0;
    }
  `]
})
export class NotFoundComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Error 404',
      'Error 404: Page Not Found',
      'article',
      'https://www.meankit.io'
    );
  }

}
