import { FC, HTMLAttributes, useMemo } from "react"
import Popover, { PopoverPlacement } from "libs/popover"
import { useSelector } from "react-redux"
import { THEMES } from "constant"
import { store } from "store"
import { selectThemeType, systemActions } from "store/slices/system.slice"

const ThemeButton: FC<HTMLAttributes<HTMLElement> & { placement?: PopoverPlacement, isHeader?: boolean }> =
  ({
    placement,
    isHeader,
    ...divAttrs
  }) => {
    const themeType = useSelector(selectThemeType)
    const { icon: ThemeIcon } = useMemo(() => THEMES.find(t => t.type === themeType) || THEMES[0], [themeType])

    return (
      <div {...divAttrs}>
        <Popover
          placement={placement}
          overlay={(
            <div className="w-[140px] overflow-hidden">
              {
                THEMES.map(theme => {
                  const Icon = theme.icon
                  return (
                    <div
                      className="w-[140px] overflow-hidden"
                      key={theme.type}
                      onClick={() => store.dispatch(systemActions.setThemeType(theme.type))}
                    >
                      <div
                        className={`flex items-center p-1 cursor-pointer rounded duration-200 hover:bg-zinc-100/60 
                        dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-300 mb-0.5
                         ${themeType === theme.type && 'cursor-not-allowed bg-zinc-600 hover:bg-zinc-600 dark:hover:bg-zinc-600 text-white'}`}
                      >
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
          {ThemeIcon &&
            (
              <ThemeIcon
                className={`block w-4 h-4 p-1 duration-200 outline-none 
               hover:bg-zinc-100/60 cursor-pointer dark:text-zinc-300 dark:hover:bg-zinc-900
                ${isHeader ? 'rounded-sm' : 'rounded-full'}`}
              />
            )
          }
        </Popover>
      </div>
    )
  }

export default ThemeButton
