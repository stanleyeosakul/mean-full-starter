import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-mongo-db',
  templateUrl: './mongo-db.component.html',
  styles: []
})
export class MongoDbComponent implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Using MongoDB Atlas',
      'Guide to setting up the cloud database as a service (DaaS), MongoDB Atlas, with the MEAN full starter template',
      'article',
      'https://www.meankit.io/guides/cloud-database-service-with-mongodb-atlas'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}


