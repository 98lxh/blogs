import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "constant"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { store } from "store"
import { selectThemeType, systemActions } from "store/slices/system.slice"
import { useMount } from "./useMount"
let matchMedia: MediaQueryList

const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

const changeTheme = (themeType: string) => {
  const root = document.querySelector('html')
  if (!root) return
  let themeClass = ''
  switch (themeType) {
    case THEME_LIGHT:
      themeClass = 'light'
      break
    case THEME_DARK:
      themeClass = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClass = matchMedia.matches ? 'dark' : 'light'
  }
  root.className = themeClass
}

export const useTheme = () => {
  const themeType = useSelector(selectThemeType)

  //初始化从本地存储中读取初始化应用主题
  useMount(() => {
    store.dispatch(systemActions.setThemeType(window.localStorage.getItem('theme')))
  })

  useEffect(() => {
    changeTheme(themeType)
  }, [themeType])
}
