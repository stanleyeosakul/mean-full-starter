import { Router } from 'express';
import { BookController } from '../controllers/BookController';
import { BookModel } from '../models/Book';

export class LibraryRouter {
  private readonly bookController: BookController;
  router: Router;

  constructor() {
    this.router = Router();
    this.bookController = new BookController(BookModel);
    this.routes();
  }

  private routes() {
    this.router.get('/', this.bookController.getIndex);
    this.router
      .route('/book')
      .get(this.bookController.getAll)
      .post(this.bookController.createFromBody);

    this.router
      .route('/book/:id')
      .get(this.bookController.getById)
      .put(this.bookController.updateFromBody)
      .delete(this.bookController.delete);
  }
}
