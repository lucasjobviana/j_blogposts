import { IPost } from './IPost';

export class Post implements IPost {
  id: number;
  title: string;
  content: string;
  published: string;
  updated: string;
  userId: number;

  constructor (title: string) {
    this.title = title;
    this.content = 'Counteúdo';
  }
}