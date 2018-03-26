import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';

import { BooksComponent } from './components/books/books.component';
import { BookCreateComponent } from './components/book-create/book-create.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookService } from './services/book.service';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'create', component: BookCreateComponent },
  { path: 'details/:id', component: BookDetailComponent },
  { path: 'edit/:id', component: BookEditComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    BooksComponent,
    BookCreateComponent,
    BookDetailComponent,
    BookEditComponent,
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
