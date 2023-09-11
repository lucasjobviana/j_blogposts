import { ICategory } from './ICategory';

export class Category implements ICategory {
  id: number;
  name: string;
  description: string;
  image: string;
  userId: number;

  constructor (name: string) {
    this.name = name;
  }
}