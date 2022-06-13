import { Sun, Moon, Display } from "@icon-park/react"
//pc设备指定宽度
export const PC_DEVICE_WIDTH = 1024

//category本地构建数据
export const ALL_CATEGORY_ITEM = {
  id: 0,
  title: '全部'
}


export const enum THEME_TYPE {
  LIGHT = 'THEME_LIGHT',
  DARK = 'THEME_DARK',
  SYSTEM = 'THEME_SYSTEM'
}

export const THEMES = [
  {
    icon: Sun,
    type: THEME_TYPE.LIGHT,
    name: '浅色模式'
  },
  {
    icon: Moon,
    type: THEME_TYPE.DARK,
    name: '深色模式'
  },
  {
    icon: Display,
    type: THEME_TYPE.SYSTEM,
    name: '跟随系统'
  }
]
