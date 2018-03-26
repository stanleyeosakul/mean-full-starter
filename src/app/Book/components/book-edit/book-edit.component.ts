import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styles: []
})
export class BookEditComponent implements OnInit {

  // Initialize variables
  book: Book;
  errorMessage: string;
  errorToggle: boolean;

  constructor(
    private seo: SeoService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {
    // Get the id parameter from the URL
    const id = this.route.snapshot.params['id'];

    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Books API - Edit Book',
      'Update an existing book in your library',
      'article',
      `https://www.meankit.io/books/details/${id}`
    );

    // Get book details
    if (isPlatformBrowser(this.platformId)) {
      this.bookService.getBook(id)
        .subscribe((data: Book) => this.book = data);
    }
  }

  // Validate form
  validate(book) {
    if (book.title) {
      if (book.author) {
        if (book.description) {
          return true;
        } else {
          this.errorMessage = 'Please enter a description.';
        }
      } else {
        this.errorMessage = 'Please enter an author.';
      }
    } else {
      this.errorMessage = 'Please enter a title.';
    }
  }

  // Update book
  updateBook(id: string) {
    if (this.validate(this.book)) {
    this.bookService.updateBook(id, this.book)
      .subscribe((res: void) => this.router.navigate(['/books']));
    } else {
      this.errorToggle = true;
      return false;
    }
  }

}
