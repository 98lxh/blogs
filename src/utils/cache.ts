import { ICaytegory } from './../types/category';
import getInitializedDataSource from "db"
import { Category } from "db/enyity/category"

const cache = new Map()

export const getCategorys = async (): Promise<ICaytegory[]> => {
  if (cache.has('categorys')) return cache.get('categorys')
  const dataSource = await getInitializedDataSource()
  const categoryRepo = dataSource.getRepository(Category)
  const categorys = await categoryRepo.find() as unknown as ICaytegory[]
  cache.set('category', categorys)
  return categorys
}
