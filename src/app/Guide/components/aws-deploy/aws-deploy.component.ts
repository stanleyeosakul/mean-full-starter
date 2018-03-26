import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-aws-deploy',
  templateUrl: './aws-deploy.component.html',
  styles: []
})
export class AwsDeployComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Deploying to AWS',
      'Guide to deploying the app to AWS',
      'article',
      'https://www.meankit.io/guides/deploy-with-aws'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
