import { useMount } from 'ahooks';
import { ICaytegory } from '../../../types/category';
import { useAsync, useHttp } from "hooks/useAsync"

export const useCategorys = () => {
  const client = useHttp()
  const { run, ...result } = useAsync<ICaytegory[]>()

  useMount(() => {
    run(client('/category/list'))
  })

  return result
}
