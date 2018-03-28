import { IBaseRepository } from './IBaseRepository';
import { User } from '../models/User';

export interface IUserRepository extends IBaseRepository<User> {}
