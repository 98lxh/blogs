import { ICaytegory } from "types/category"
import { http } from "utils/http"

export const requestCategoryList = () => {
  return http<ICaytegory[]>('/category/list')
}
