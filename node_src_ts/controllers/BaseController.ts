import {Request, Response} from 'express';
import {MongoError} from 'mongodb';
import {Document, Model} from 'mongoose';
import {IBaseRepository} from '../repositories/IBaseRepository';
import {BaseRepository} from '../repositories/BaseRepository';

export class BaseController<T extends Document> {
  private readonly _repository: IBaseRepository<T>;
  private readonly model: Model<T>;

  constructor(_model: Model<T>) {
    this._repository = new BaseRepository<T>(_model);
    this.model = _model;
  }

  static resolveErrorResponse(res: Response, statusCode: number, message?: string, error?: MongoError): Response {
    if (error) {
      return res.status(statusCode).json({
        success: false,
        status: statusCode,
        mongoError: error.code,
        message: error.message,
        error
      });
    }

    return res.status(statusCode).json({
      success: false,
      status: statusCode,
      message
    });
  }

  static resolveResponse(res: Response, message?: string, result?: { [key: string]: any }): Response {
    const response = {
      success: true
    };

    if (message) {
      response['message'] = message;
    }

    if (result) {
      const keys = Object.keys(result);
      keys.forEach(key => {
        response[key] = result[key];
      });
    }

    return res.status(200).json(response);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const result: T[] = await this._repository.getAll();

    if (result instanceof MongoError) {
      return BaseController.resolveErrorResponse(res, 500, null, result);
    }

    return BaseController.resolveResponse(res, null, {books: result});
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const result: T = await this._repository.getById(req.params.id);

    if (result instanceof MongoError) {
      return BaseController.resolveErrorResponse(res, 500, null, result);
    }

    return BaseController.resolveResponse(res, null, {book: result});
  }

  async createFromBody(req: Request, res: Response): Promise<Response> {
    const newResource: T = await this.model.create(req.body);
    const result: T = await this._repository.create(newResource);

    if (result instanceof MongoError) {
      return BaseController.resolveErrorResponse(res, 500, null, result);
    }

    return BaseController.resolveResponse(res, null, {book: result});
  }

  async updateFromBody(req: Request, res: Response): Promise<Response> {
    const existed: T = await this._repository.getOne(req.body._id);
    const updated: T = {
      _id: existed._id,
      ...existed
    };
    const result: T = await this._repository.update(req.params.id, updated);

    if (result instanceof MongoError) {
      return BaseController.resolveErrorResponse(res, 500, null, result);
    }

    return BaseController.resolveResponse(res, null, {book: result});
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const result: T = await this._repository.delete(req.params.id);

    if (result instanceof MongoError) {
      return BaseController.resolveErrorResponse(res, 500, null, result);
    }

    return BaseController.resolveResponse(res, null, {book: result});
  }
}
