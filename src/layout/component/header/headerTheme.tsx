import { NextPage } from "next"
import { HTMLAttributes } from "react"
import Popover from "libs/popover"
import { ColorFilter, Sun, Moon } from "@icon-park/react"
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "constant"


const HeaderTheme: NextPage<HTMLAttributes<HTMLElement>> = (props) => {

  return (
    <div {...props}>
      <Popover
        overlay={(
        <div className="w-[140px] overflow-hidden">
          {
            themes.map(theme => {
              const Icon = theme.icon
              return (
                <div className="w-[140px] overflow-hidden" key={theme.id}>
                  <div className="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60">
                    <Icon className="w-1.5 h-1.5 mr-1" />
                    <span className="text-zinc-800 text-sm">{theme.name}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      )}
      >
        <Sun className="block w-4 h-4 p-1 duration-200 outline-none hover:bg-zinc-100/60 cursor-pointer rounded-sm" />
      </Popover>
    </div>
  )
}

const themes = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: Sun,
    name: '浅色模式'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: Moon,
    name: '深色模式'
  },
  {
    id: '3',
    type: THEME_SYSTEM,
    icon: ColorFilter,
    name: '跟随系统'
  }
]


export default HeaderTheme
