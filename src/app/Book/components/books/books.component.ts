import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SeoService } from '../../../Shared/services/seo.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styles: [`
    .noBooksPadding {
      padding: 5rem;
    }

    .btnPadding {
      padding: 0 2px;
    }
  `]
})
export class BooksComponent implements OnInit {

   // Initialize variables
  books: any;
  book: Book;
  bookToDelete: Book;
  deleteSwitch: boolean;

  constructor(
    private seo: SeoService,
    private bookService: BookService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Books API Home',
      'Displays all the books in the Books API Library',
      'article',
      'https://www.meankit.io/books'
    );

    // Get all books
    if (isPlatformBrowser(this.platformId)) {
      this.bookService.getAllBooks()
        .subscribe((data: Book[]) => this.books = data);
    }

  }

  // Show modal to confirm delete
  toggleDelete(book: Book) {
    this.deleteSwitch = !this.deleteSwitch;
    this.bookToDelete = book;
  }

  // Delete book
  deleteBook(book: Book) {
    this.bookService.deleteBook(book._id)
      .mergeMap((res) => this.bookService.getAllBooks())
      .subscribe((data: Book[]) => this.books = data);
    this.deleteSwitch = !this.deleteSwitch;
  }


}
