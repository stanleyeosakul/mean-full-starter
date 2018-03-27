import { BaseRepository } from './BaseRepository';
import { Book } from '../models/Book';
import { IBookRepository } from './IBookRepository';
import { Model } from 'mongoose';

export class BookRepository extends BaseRepository<Book> implements IBookRepository {
  private readonly bookModel: Model<Book>;

  constructor(_bookModel: Model<Book>) {
    super(_bookModel);
    this.bookModel = _bookModel;
  }
}
