import { historyActions } from 'store/history.slice';
import { useMount } from "ahooks"
import { store } from "store"

export const useSearchHistory = () => {

  useMount(() => {
    store.dispatch(historyActions.initHistory(JSON.parse(localStorage.getItem('history') as any) || []))
  })
}
