import { useMount } from 'ahooks';
import { ICategory } from '../../../types/category';
import { useAsync, useHttp } from "hooks/useAsync"

export const useCategorys = () => {
  const client = useHttp()
  const { run, data: categorys, ...result } = useAsync<ICategory[]>()

  useMount(() => {
    run(client('/category/list'))
  })

  return {
    ...result,
    categorys
  }
}
