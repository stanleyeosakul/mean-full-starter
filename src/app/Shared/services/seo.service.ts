import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
    // Token that identifies the executing platform’s type
    @Inject (PLATFORM_ID) private platformId,

    // Custom providers for document object
    @Inject ('BODY') private body,
    @Inject ('DOCUMENTELEMENT') private documentElement,
    @Inject ('WINDOWPR') private windowPR) { }

  // Set meta tags for each webpage
  setMetaTags(title: string, description: string, ogType: string, ogUrl: string) {

    // Scroll to the top of the page
    if (isPlatformBrowser(this.platformId)) {
      this.body.scrollTop = this.documentElement.scrollTop = 0;
    }

    // Set standard meta tags
    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'twitter:card', value: 'summary' },
      { name: 'og:title', content: title },
      { name: 'og:type', content: ogType },
      { name: 'og:url', content: ogUrl },
      { name: 'og:image', content: 'https://s3.amazonaws.com/meankit300/social.jpg' },
      { name: 'og:description', content: description }], true
    );

  }

  // Display Google-Prettify
  displayPretty() {
    if (isPlatformBrowser(this.platformId)) this.windowPR.prettyPrint();
  }

}
