import { ICategory } from './ICategory';

export class Category implements ICategory {
  id: string;
  name: string;
  description: string;
  image: string;

  constructor (name: string) {
    this.name = name;
  }
}