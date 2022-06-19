import { ICategory } from "types/category"
import { http } from "utils/http"

export const requestCategoryList = () => {
  return http<ICategory[]>('/category/list')
}
