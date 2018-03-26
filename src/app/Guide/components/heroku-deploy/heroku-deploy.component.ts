import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-heroku-deploy',
  templateUrl: './heroku-deploy.component.html',
  styles: []
})
export class HerokuDeployComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Deploying to Heroku',
      'Guide to deployin the app to Heroku',
      'article',
      'https://www.meankit.io/guides/deploy-to-heroku'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
