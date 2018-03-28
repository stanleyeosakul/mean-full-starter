import { IUserRepository } from './IUserRepository';
import { BaseRepository } from './BaseRepository';
import { User } from '../models/User';
import { Model } from 'mongoose';

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  private readonly userModel: Model<User>;

  constructor(_userModel: Model<User>) {
    super(_userModel);
    this.userModel = _userModel;
  }

  // async getUserByEmail(email: string): Promise<User> {
  //   return await this.userModel.findOne({ email }).exec();
  // }
}
