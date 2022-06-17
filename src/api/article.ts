import { EditorArticle } from 'store/slices/editor.slice';
import { IArticle } from 'types/article';
import { http } from "utils/http"

interface ArticleListQuery {
  category?: string
  size: number
  page: number
  search?: string
}


//获取文章列表
export const requestArticleList = (data: ArticleListQuery) => {
  return http<IArticle[]>('/article/list', {
    method: 'POST',
    data
  })
}

//获取文章详情
export const requestArticleDetail = (id: number) => {
  return http<IArticle>('/article/detail', {
    method: 'POST',
    data: {
      id
    }
  })
}

//新建文章
export const publishArticle = (data: EditorArticle) => {
  return http<IArticle>('/article/publish', {
    method: 'POST',
    data: data
  })
}

//更新文章
export const updateArticle = (data: EditorArticle) => {
  return http<IArticle>('/article/update', {
    method: 'POST',
    data: data
  })
}

