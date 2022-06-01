import { NextPage } from "next"
import { HTMLAttributes } from "react"
import Popover from "libs/popover"
import { DarkMode, NaturalMode, Luminous } from "@icon-park/react"
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "constant"


const HeaderTheme: NextPage<HTMLAttributes<HTMLElement>> = (props) => {

  return (
    <div {...props}>
      <Popover overlay={(
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
        <Luminous className="inline-block w-4 h-4 p-1 duration-200 outline-none hover:bg-zinc-100/60 cursor-pointer rounded-sm" />
      </Popover>
    </div>
  )
}

const themes = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: Luminous,
    name: '浅色模式'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: DarkMode,
    name: '深色模式'
  },
  {
    id: '3',
    type: THEME_SYSTEM,
    icon: NaturalMode,
    name: '跟随系统'
  }
]


export default HeaderTheme
