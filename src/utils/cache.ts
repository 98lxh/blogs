import { ICategory } from './../types/category';
import { ALL_CATEGORY_ITEM } from "constant"
import getInitializedDataSource from "db"
import { Category } from "db/enyity/category"

const localCache = new Map()
export const getCacheCategorys = async (): Promise<ICategory[]> => {
  if (localCache.has('category')) return localCache.get('category')
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)
  const categorys = await categoryRepo.find() as unknown as ICategory[]
  localCache.set('category', [ALL_CATEGORY_ITEM, ...categorys])

  return localCache.get('category')
}
