import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/Book';
import { SeoService } from '../../../Shared/services/seo.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styles: []
})
export class BookCreateComponent implements OnInit {

   // Initialize variables
  book: Book = {
    title: '',
    author: '',
    description: ''
  };
  errorMessage: string;
  errorToggle: boolean;
  btnDisabled: boolean;

  constructor(
    private seo: SeoService,
    private bookService: BookService,
    private router: Router) { }

  ngOnInit() {
    // Update meta tags
    this.seo.setMetaTags(
      'MEANkit.io | Books API - Create Book',
      'List a new book for your library',
      'article',
      'https://www.meankit.io/books/create'
    );
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

  // Add new book
  addBook() {
    if (this.validate(this.book)) {
      this.bookService.insertBook(this.book)
        .subscribe((res: Book) => this.router.navigate(['/books']));
      } else {
      this.errorToggle = true;
      return false;
    }
  }

}
