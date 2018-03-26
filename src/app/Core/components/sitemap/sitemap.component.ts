import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styles: []
})
export class SitemapComponent implements OnInit {

  constructor(
    private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Sitemap',
      'MEAN Stack template website sitemap',
      'article',
      'https://www.meankit.io/sitemap'
    );
  }

}
