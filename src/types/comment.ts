import { User } from './user';

export interface IComment {
  id: number
  content: string
  create_time: number
  user: User
}
