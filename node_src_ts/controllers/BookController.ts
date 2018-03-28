import { BaseController } from './BaseController';
import { IBookRepository } from '../repositories/IBookRepository';
import { BookRepository } from '../repositories/BookRepository';
import { Book } from '../models/Book';
import { Request, Response } from 'express';
import { Model } from 'mongoose';

export class BookController extends BaseController<Book> {
  private readonly _bookRepository: IBookRepository;

  constructor(model: Model<Book>) {
    super(model);
    this._bookRepository = new BookRepository(model);
  }

  async getIndex(req: Request, res: Response): Promise<Response> {
    return BookController.resolveResponse(res, 'This is the Book API root route');
  }
}
