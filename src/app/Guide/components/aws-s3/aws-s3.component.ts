import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-aws-s3',
  templateUrl: './aws-s3.component.html',
  styles: []
})
export class AwsS3Component implements OnInit, AfterViewChecked {

  constructor(private seo: SeoService) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Using AWS S3',
      'Guide to setting up cloud storage with AWS S3 in the MEAN stack full starter template',
      'article',
      'https://www.meankit.io/guides/cloud-storage-with-amazon-s3'
    );
  }

  ngAfterViewChecked() {
    // Display code using Google's code-prettify
    this.seo.displayPretty();
  }

}
