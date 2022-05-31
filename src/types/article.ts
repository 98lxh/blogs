import { User } from './user';

export interface IArticle {
  id: number
  title: string
  content: string
  create_time: Date
  update_time: Date
  views: number
  user: User
}
