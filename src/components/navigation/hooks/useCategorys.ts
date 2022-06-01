import { useEffect, useState } from 'react';
import { useMount } from 'ahooks';
import { ICaytegory } from '../../../types/category';
import { useAsync, useHttp } from "hooks/useAsync"
import { ALL_CATEGORY_ITEM } from 'constant';

export const useCategorys = () => {
  const client = useHttp()
  const { run, data, ...result } = useAsync<ICaytegory[]>()
  const [categorys, setCategorys] = useState<ICaytegory[]>([])

  useEffect(() => {
    if (!data) return
    setCategorys(() => [ALL_CATEGORY_ITEM as any, ...data])
  },
    [data])

  useMount(() => {
    run(client('/category/list'))
  })

  return {
    ...result,
    categorys
  }
}
