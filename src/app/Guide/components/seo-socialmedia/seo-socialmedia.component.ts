import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-seo-socialmedia',
  templateUrl: './seo-socialmedia.component.html',
  styles: []
})
export class SeoSocialmediaComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | SEO and Social Media',
      'Guide to setting up Search Engine Optimization (SEO) and Social Media links with the MEAN stack full starter template',
      'article',
      'https://www.meankit.io/guides/search-engine-optimization-and-social-media'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
