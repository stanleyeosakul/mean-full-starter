import { BaseController } from './BaseController';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { User, UserModel } from '../models/User';
import { Request, Response } from 'express';
import { MongoError } from 'mongodb';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { Model } from 'mongoose';
/**
 * AWS
 */
import { AWSError, S3 } from 'aws-sdk';
import { coreConfig } from '../config/keys';
import { DeleteObjectOutput, DeleteObjectRequest } from 'aws-sdk/clients/s3';

export class UserController extends BaseController<User> {
  private readonly _userRepository: IUserRepository;
  readonly s3: S3;

  constructor(model: Model<User>) {
    super(model, 'user');
    this._userRepository = new UserRepository(model);
    this.s3 = new S3({
      accessKeyId: coreConfig.aws.accessKey,
      secretAccessKey: coreConfig.aws.secretKey
    });
  }

  private deleteProfilePic(imageKey: string) {
    const params: DeleteObjectRequest = {
      Bucket: coreConfig.aws.bucketName,
      Key: imageKey
    };

    this.s3.deleteObject(params, (err: AWSError, data: DeleteObjectOutput) => {
      if (err) console.log(err);
    });
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const existedUser: User = await this._userRepository.getOne(email, 'email');
    if (existedUser instanceof MongoError) {
      return UserController.resolveErrorResponse(res, 400, null, existedUser);
    }

    const newUser: User = new UserModel({
      email,
      password
    });

    const result: User = await this._userRepository.create(newUser);

    if (result instanceof MongoError) {
      return UserController.resolveErrorResponse(res, 500, null, result);
    }

    const savedUser: User = await result.save();
    const token: string = sign({ user: savedUser }, coreConfig.JWT.secret, { expiresIn: '7d' });

    return UserController.resolveResponse(res, 'Registration successfully', { token });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const fetched: User = await this._userRepository.getOne(email, 'email');

    if (fetched instanceof MongoError) {
      return UserController.resolveErrorResponse(res, 500, null, fetched);
    }

    if (!fetched || fetched === null) {
      return UserController.resolveErrorResponse(res, 400, 'Invalid Email/Password Combination');
    }

    const isMatched: boolean = await compare(password, fetched.password);

    if (!isMatched) {
      return UserController.resolveErrorResponse(res, 400, 'Invalid Email/Password Combination');
    }

    fetched.lastLogin = new Date();
    const result: User = await this._userRepository.update(fetched._id, fetched);

    if (result instanceof MongoError) {
      return UserController.resolveErrorResponse(res, 500, null, result);
    }

    const token: string = sign({ user: result }, coreConfig.JWT.secret, { expiresIn: '7d' });
    return UserController.resolveResponse(res, 'Login Successful', { token });
  }

  async getProfile(req: Request, res: Response): Promise<Response> {
    const currentUser: User = req['user'] as User;

    return UserController.resolveResponse(res, 'Profile retrieved successfully', {
      user: {
        email: currentUser.email,
        displayName: currentUser.displayName,
        imageURL: currentUser.imageURL,
        created: currentUser.created,
        lastLogin: currentUser.lastLogin
      }
    });
  }

  async uploadProfile(req: Request, res: Response): Promise<Response> {
    const currentUser: User = await this._userRepository.getById((req['user'] as User)._id);
    const { displayName, password } = req.body;
    const file = req['file'] as S3File;

    if (currentUser instanceof MongoError) {
      return UserController.resolveErrorResponse(res, 500, null, currentUser);
    }

    if (displayName) {
      currentUser.displayName = displayName;
    }

    if (password) {
      currentUser.password = password;
    }

    if (file !== undefined) {
      if (currentUser.hasUploadedImage) {
        this.deleteProfilePic(currentUser.imageKey);
      }

      currentUser.imageURL = file.location;
      currentUser.imageKey = file.key;
      currentUser.hasUploadedImage = true;
    }

    await currentUser.save();
    return UserController.resolveResponse(res, 'Profile updated successfully');
  }

  async resetProfilePic(req: Request, res: Response): Promise<Response> {
    const currentUser: User = await this._userRepository.getById((req['user'] as User)._id);

    if (currentUser instanceof MongoError) {
      return UserController.resolveErrorResponse(res, 500, null, currentUser);
    }

    if (currentUser.hasUploadedImage) {
      this.deleteProfilePic(currentUser.imageKey);
    }

    currentUser.imageURL = req.body.imageURL;
    currentUser.imageKey = '';
    currentUser.hasUploadedImage = false;

    await currentUser.save();
    return UserController.resolveResponse(res, 'Profile updated successfully');
  }
}

export interface S3File {
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: null;
  storageClass: string;
  serverSideEncryption: null;
  metadata: any;
  location: string;
  etag: string;
  /** Field name specified in the form */
  fieldname: string;
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** The name of the file within the destination (DiskStorage) */
  filename: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer: Buffer;
}
