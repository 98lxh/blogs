import { http } from "utils/http"

//获取提示信息
export const requestHintList = (keyword: string) => {
  return http<{ title: string }[]>('article/hint', {
    data: {
      keyword,
    }
  })
}
