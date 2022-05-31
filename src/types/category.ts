import { IArticle } from 'types/article';
export interface ICaytegory {
  id: number
  title: string
  icon: string
  article_count: number
  article: IArticle[]
}
