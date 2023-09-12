import { IUser } from './IUser';

export class User implements IUser {
  id: number;
  displayName: string;
  email: string;
  password: string;
  image: string;
  hash: string;

  constructor (displayName: string, email: string, password: string) {
    this.displayName = displayName;
    this.email = email;
    this.password = password;
  }
}