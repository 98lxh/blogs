import { useEffect } from "react"
import { store } from "store"
import { authActions } from "store/slices/auth.slice"

export const useUserInfo = () => {
  useEffect(() => {
    const user = window.localStorage.getItem('user')
    store.dispatch(authActions.setUser(user ? JSON.parse(user) : null))
  }, [])
}
