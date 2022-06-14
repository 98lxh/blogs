import { IArticle } from 'types/article';
import { http } from "utils/http"

export const requestArticleDetial = (id: number) => {
  return http<IArticle>('/article', {
    method: 'POST',
    data: {
      id
    }
  })
}
