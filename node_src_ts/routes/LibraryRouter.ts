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
    this.router.get('/', this.bookController.getIndex.bind(this.bookController));
    this.router
      .route('/book')
      .get(this.bookController.getAll.bind(this.bookController))
      .post(this.bookController.createFromBody.bind(this.bookController));

    this.router
      .route('/book/:id')
      .get(this.bookController.getById.bind(this.bookController))
      .put(this.bookController.updateFromBody.bind(this.bookController))
      .delete(this.bookController.delete.bind(this.bookController));
  }
}
