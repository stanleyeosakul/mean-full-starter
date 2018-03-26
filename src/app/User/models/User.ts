export interface User {
  _id?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  displayName?: string;
  imageURL?: string;
  profile_pic?: any;
  created?: Date;
  lastLogin?: Date;
}
