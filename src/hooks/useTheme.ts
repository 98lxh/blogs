import { useEffect } from "react"
import { useSelector } from "react-redux"
import { THEME_TYPE } from "constant"
import { store } from "store"
import { selectThemeType, systemActions } from "store/slices/system.slice"
import { useMount } from "./useMount"
let matchMedia: MediaQueryList

const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_TYPE.SYSTEM)
  }
}

const changeTheme = (themeType: string) => {
  const root = document.querySelector('html')
  if (!root) return
  let themeClass = ''
  switch (themeType) {
    case THEME_TYPE.LIGHT:
      themeClass = 'light'
      break
    case THEME_TYPE.DARK:
      themeClass = 'dark'
      break
    case THEME_TYPE.SYSTEM:
      watchSystemThemeChange()
      themeClass = matchMedia.matches ? 'dark' : 'light'
  }
  store.dispatch(systemActions.setCurrentTheme(themeClass === 'dark' ? THEME_TYPE.DARK : THEME_TYPE.LIGHT))
  root.className = themeClass
}

export const useTheme = () => {
  const themeType = useSelector(selectThemeType)

  //初始化从本地存储中读取初始化应用主题
  useMount(() => {
    store.dispatch(systemActions.setThemeType(window.localStorage.getItem('theme')))
  })

  useEffect(() => {
    changeTheme(themeType!)
  }, [themeType])
}
