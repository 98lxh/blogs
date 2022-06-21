import { FC, Fragment, useEffect, useState } from "react"
import { Home, Search as SearchIcon, User } from "@icon-park/react"
import HeaderSearch from "../header/headerSearch"
import { THEMES } from "constant"
import { TriggerItem, TriggerMenu } from "libs/triggerMenu"
import React, { HTMLAttributes, useMemo } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { selectUser } from "store/slices/auth.slice"
import { selectIsMobile, selectThemeType, systemActions } from "store/slices/system.slice"
import { useRouter } from "next/router"
import { CSSTransition } from "react-transition-group"

interface MainProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: React.ReactNode
}

const MobileTriggerMenu = () => {
  const dispatch = useDispatch()
  const isMobile = useSelector(selectIsMobile)
  const userInfo = useSelector(selectUser, shallowEqual)
  const themeType = useSelector(selectThemeType)
  const Theme = useMemo(() => THEMES.find(t => t.type === themeType) || THEMES[0], [themeType])
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const closeMobileSearch = () => setShowMobileSearch(false)
    router.events.on('routeChangeComplete', closeMobileSearch)

    return () => {
      router.events.off('routeChangeComplete', closeMobileSearch)
    }
  }, [
    router.events
  ])

  const onChangeThemeType = () => {
    const index = THEMES.findIndex(t => t.type === themeType)
    dispatch(systemActions.setThemeType(index === THEMES.length - 1 ? THEMES[0].type : THEMES[index + 1].type))
  }

  return (
    isMobile
      ? (
        <Fragment>
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
              icon={<SearchIcon />}
              iconClass="text-zinc-900 dark:text-zinc-200"
              textClass="text-zinc-900 dark:text-zinc-200"
              onClick={() => setShowMobileSearch(true)}
            >
              搜索
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
          <CSSTransition classNames="popup-down-up" in={showMobileSearch} timeout={500} unmountOnExit={true}>
            <div className="fixed top-0 left-0 z-50 w-screen h-screen p-1">
              <div
                className=" absolute top-0 left-0 w-full h-full bg-zinc-900/80 text-sm text-zinc-200 flex justify-center items-center"
                onClick={() => setShowMobileSearch(false)}
              >
                点击遮罩层关闭搜索
              </div>
              <HeaderSearch />
            </div>
          </CSSTransition>
        </Fragment>

      )
      : null
  )
}

const Main: FC<MainProps> = ({ children, ...props }) => {

  return (
    <main {...props}>
      {children}
      <MobileTriggerMenu />
    </main>
  )
}

export default Main
