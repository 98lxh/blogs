import { Home, User } from "@icon-park/react"
import { TriggerItem, TriggerMenu } from "libs/triggerMenu"
import { NextPage } from "next"
import React, { HTMLAttributes } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { selectUser } from "store/slices/auth.slice"
import { selectIsMobile } from "store/slices/system.slice"

interface MainProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: React.ReactNode
}

const MobileTriggerMenu = () => {
  const isMobile = useSelector(selectIsMobile)
  const userInfo = useSelector(selectUser, shallowEqual)

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

const Main: NextPage<MainProps> = ({ children, ...props }) => {

  return (
    <main {...props}>
      {children}
      <MobileTriggerMenu />
    </main>
  )
}

export default Main
