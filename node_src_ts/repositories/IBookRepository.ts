import { IBaseRepository } from './IBaseRepository';
import { Book } from '../models/Book';

export interface IBookRepository extends IBaseRepository<Book> {}
