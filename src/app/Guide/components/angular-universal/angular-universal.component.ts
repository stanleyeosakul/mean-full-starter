import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-angular-universal',
  templateUrl: './angular-universal.component.html',
  styles: []
})
export class AngularUniversalComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Angular Universal Setup',
      'Guide to setting up Angular Universal with the MEAN stack full starter template',
      'article',
      'https://www.meankit.io/guides/angular-universal-setup'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
