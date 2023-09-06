import { IUser } from './IUser';

export class User implements IUser {
  id: string;
  displayName: string;
  email: string;
  password: string;
  image: string;
  hash: string;

  constructor (displayName: string, email: string, password: string) {
    this.displayName = displayName;
    this.email = email;
    this.password = password;
    this.image = 'https://i.pinimg.com/564x/51/65/bb/5165bbc3564b4296c70371b75c9774b0.jpg';
  }
}