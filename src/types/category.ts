import { IArticle } from 'types/article';
export interface ICategory {
  id: number
  title: string
  cover: string
  article_count: number
  article: IArticle[]
}
