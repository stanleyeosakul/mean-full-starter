import { Document, HookNextFunction, model, Model, Schema } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  displayName: { type: String, default: 'New User' },
  created: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  imageURL: { type: String, default: 'assets/images/anonymous.png' },
  imageKey: { type: String, default: '' },
  hasUploadedImage: { type: Boolean, default: false }
});

UserSchema.pre('save', async function(next: HookNextFunction) {
  const user: User = this;
  if (!user.isModified('password')) return next();

  const salt = await genSalt(10);
  user.password = await hash(user.password, salt);
  next();
});

export interface User extends Document {
  email?: string;
  password?: string;
  displayName?: string;
  created?: Date;
  lastLogin?: Date;
  imageURL?: string;
  imageKey?: string;
  hasUploadedImage?: boolean;
}

export const UserModel: Model<User> = model<User>('User', UserSchema) as Model<User>;
