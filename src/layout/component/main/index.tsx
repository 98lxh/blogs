import { FC } from "react"
import { Home, User } from "@icon-park/react"
import { THEMES} from "constant"
import { TriggerItem, TriggerMenu } from "libs/triggerMenu"
import React, { HTMLAttributes, useMemo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { selectUser } from "store/slices/auth.slice"
import { selectIsMobile, selectThemeType, systemActions } from "store/slices/system.slice"

interface MainProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: React.ReactNode
}

const MobileTriggerMenu = () => {
  const dispatch = useDispatch()
  const isMobile = useSelector(selectIsMobile)
  const userInfo = useSelector(selectUser, shallowEqual)
  const themeType = useSelector(selectThemeType)
  const Theme = useMemo(() => THEMES.find(t => t.type === themeType) || THEMES[0], [themeType])

  const onChangeThemeType = () => { 
    const index = THEMES.findIndex(t => t.type === themeType)
    dispatch(systemActions.setThemeType(index === THEMES.length - 1 ? THEMES[0].type : THEMES[index + 1].type))
  }

  return (
    isMobile
      ? (
        <TriggerMenu>
          <TriggerItem
            icon={<Home />}
            iconClass="text-zinc-900 dark:text-zinc-200"
            textClass="text-zinc-900 dark:text-zinc-200"
            to="/"
          >
            首页
          </TriggerItem>
          <TriggerItem
            icon={<Theme.icon />}
            iconClass="text-zinc-900 dark:text-zinc-200"
            textClass="text-zinc-900 dark:text-zinc-200"
            onClick={onChangeThemeType}
          >
            {Theme.name}
          </TriggerItem>
          <TriggerItem
            icon={<User />}
            iconClass="text-zinc-900 dark:text-zinc-200"
            textClass="text-zinc-900 dark:text-zinc-200"
            to={userInfo ? '/profile' : '/login'}
          >
            {userInfo ? '我的' : '去登陆'}
          </TriggerItem>
        </TriggerMenu>
      )
      : null
  )
}

const Main:FC<MainProps> = ({ children, ...props }) => {

  return (
    <main {...props}>
      {children}
      <MobileTriggerMenu />
    </main>
  )
}

export default Main
