import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../../Shared/services/seo.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styles: []
})
export class BookDetailComponent implements OnInit {

  // Initialize variables
  book: any;

  constructor(
    private seo: SeoService,
    private bookService: BookService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    // Get the id parameter from the URL
    const id = this.route.snapshot.params['id'];

    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Books API - Book Details',
      'Displays the specific details of a book',
      'article',
      `https://www.meankit.io/books/details/${id}`
    );

    // Get book details
    if (isPlatformBrowser(this.platformId)) {
      this.bookService.getBook(id)
        .subscribe((data: any) => this.book = data.book);
    }
  }

}
