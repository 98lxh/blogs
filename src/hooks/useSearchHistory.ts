import { useMount } from "ahooks"
import { store } from "store"
import { searchActions } from "store/slices/search.slice"

export const useSearchHistory = () => {
  useMount(() => {
    //初始化历史搜索
    store.dispatch(searchActions.initHistory(JSON.parse(localStorage.getItem('history') as any) || []))
  })
}
