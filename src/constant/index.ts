import { Light, DarkMode, Other } from "@icon-park/react"
//pc设备指定宽度
export const PC_DEVICE_WIDTH = 1280
//category本地构建数据
export const ALL_CATEGORY_ITEM = {
  id: 0,
  title: '全部'
}


export const THEME = {
  light: {
    icon: Light,
    title: '浅色模式'
  },
  dark: {
    icon: DarkMode,
    title: '深色模式'
  },
  system: {
    icon: Other,
    title: '跟随系统'
  }
}

export const THEME_LIGHT = 'THEME_LIGHT'
export const THEME_DARK = 'THEME_DARK'
export const THEME_SYSTEM = 'THEME_SYSTEM'
