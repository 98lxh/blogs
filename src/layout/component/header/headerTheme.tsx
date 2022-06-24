import { NextPage } from "next"
import { HTMLAttributes, useMemo } from "react"
import Popover from "libs/popover"
import { useSelector } from "react-redux"
import { selectThemeType, systemActions } from "store/slices/system.slice"
import { store } from "store"
import { THEMES } from "constant"

const HeaderTheme: NextPage<HTMLAttributes<HTMLElement>> = (props) => {
  const themeType = useSelector(selectThemeType)
  const { icon: ThemeIcon } = useMemo(() => THEMES.find(t => t.type === themeType) || THEMES[0], [themeType])
  
  return (
    <div {...props}>
      <Popover
        overlay={(
        <div className="w-[140px] overflow-hidden">
          {
            THEMES.map(theme => {
              const Icon = theme.icon
              return (
                <div
                  className="w-[140px] overflow-hidden"
                  key={theme.name}
                  onClick={ ()=> store.dispatch(systemActions.setThemeType(theme.type))}
                >
                  <div className="flex items-center p-1 cursor-pointer rounded duration-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-300">
                    <Icon className="w-1.5 h-1.5 mr-1" />
                    <span className="0 text-sm">{theme.name}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      )}
      >
        { ThemeIcon && <ThemeIcon className="block w-4 h-4 p-1 duration-200 outline-none hover:bg-zinc-100/60 cursor-pointer rounded-sm dark:text-zinc-300 dark:hover:bg-zinc-900" />}
      </Popover>
    </div>
  )
}

export default HeaderTheme
