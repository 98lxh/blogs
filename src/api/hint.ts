import { http } from "utils/http"

export const requestHintList = (keyword: string) => {
  return http<{ title: string }[]>('article/hint', {
    data: {
      keyword,
    }
  })
}
