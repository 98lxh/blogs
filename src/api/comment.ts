import { IComment } from "types/comment"
import { http } from "utils/http"

export const publishComment = (content: string, articleId: number) => {
  return http<IComment>('/comment/publish', {
    method: 'POST',
    data: {
      content,
      articleId
    }
  })
}

export const requestCommentList = (articleId: number, page = 1) => {
  return http<IComment[]>('/comment/list', {
    method: 'POST',
    data: {
      articleId,
      page
    }
  })
}
