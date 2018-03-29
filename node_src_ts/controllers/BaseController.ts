import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { Document, Model } from 'mongoose';
import { IBaseRepository } from '../repositories/IBaseRepository';
import { BaseRepository } from '../repositories/BaseRepository';

export class BaseController<T extends Document> {
  private readonly _repository: IBaseRepository<T>;
  private readonly model: Model<T>;
  private resObj: ResultType;
  private key: string;

  constructor(_model: Model<T>, _key: string) {
    this._repository = new BaseRepository<T>(_model);
    this.model = _model;
    this.key = _key;
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

  static resolveResponse(res: Response, message?: string, result?: ResultType): Response {
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

    return this.responseTypeResolver(res, result, true);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const result: T = await this._repository.getById(req.params.id);

    return this.responseTypeResolver(res, result);
  }

  async createFromBody(req: Request, res: Response): Promise<Response> {
    const newResource: T = await this.model.create({ ...req.body });
    const result: T = await this._repository.create(newResource);

    return this.responseTypeResolver(res, result);
  }

  async updateFromBody(req: Request, res: Response): Promise<Response> {
    const existed: T = await this._repository.getOne(req.body._id);
    // const updated = {
    //   _id: existed._id,
    //   ...req.body
    // } as T;
    const updated: T = {
      _id: existed._id,
      ...req.body
    };

    const result: T = await this._repository.update(req.params.id, updated);

    return this.responseTypeResolver(res, result);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const result: T = await this._repository.delete(req.params.id);

    return this.responseTypeResolver(res, result);
  }

  private responseTypeResolver(res: Response, result: any, plural: boolean = false): Response {
    this.resObj = {};
    let tempKey = this.key;

    if (plural) {
      tempKey = `${this.key}s`;
    }

    if (result instanceof MongoError) {
      return BaseController.resolveErrorResponse(res, 500, null, result);
    }

    this.resObj[tempKey] = result;
    return BaseController.resolveResponse(res, null, this.resObj);
  }
}

interface ResultType {
  [key: string]: any;
}
