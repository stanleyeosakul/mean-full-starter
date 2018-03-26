import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-now-deploy',
  templateUrl: './now-deploy.component.html',
  styles: []
})
export class NowDeployComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Deploying to Now',
      'Guide to deploying the app to Zeit Now',
      'article',
      'https://www.meankit.io/guides/deploy-to-now'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
