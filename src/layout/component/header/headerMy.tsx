import Popover from "libs/popover"
import { NextPage } from "next"
import { Down, User as UserIcon, Logout } from "@icon-park/react"
import { FC, HTMLAttributes, useMemo, useCallback } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "store/slices/auth.slice"
import { User } from "types/user"
import Button from "libs/button"
import { useRouter } from "next/router"
import message from "libs/message"
import confirm from "libs/confirm"

const Logged: FC<{ userInfo: User }> = ({ userInfo }) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>
  const { push } = useRouter()

  const onLogout = useCallback(async () => {
    confirm({
      title: '确认退出',
      content: "是否确认退出",
      onConfirm: async () => {
        await dispatch(logout())
        message.success('退出成功!')
        push('/')
      }
    })
  }, [push, dispatch, message, confirm])

  const toProfile = useCallback(() => {
    push('/profile')
  }, [push])

  const menus = useMemo(() => ([
    {
      id: 0,
      title: '个人资料',
      icon: UserIcon,
      path: '/profile',
      onClick: toProfile
    },
    {
      id: 2,
      title: '退出登录',
      icon: Logout,
      onClick: onLogout
    },
  ]),
    [onLogout, toProfile]
  )

  return (
    <Popover
      overlay={
        (
          <div className="w-[140px] overflow-hidden">
            {
              menus.map(menu => {
                const Icon = menu.icon
                return (
                  <div
                    className="flex items-center p-1 cursor-pointer rounded-sm duration-200 text-zinc-900 hover:bg-zinc-100/60 dark:hover:bg-zinc-800 dark:text-zinc-300"
                    onClick={() => menu.onClick && menu.onClick()}
                    key={menu.id}
                  >
                    <Icon className="w-1.5 h-1.5 mr-1" />
                    <span className="text-sm">{menu.title}</span>
                  </div>
                )
              })
            }
          </div>
        )
      }
    >
      <div className="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
        <img className="w-3 h-3 rounded-sm" src={userInfo?.avatar} alt="" />
        <Down className="w-1.5 h-1.5 ml-0.5 dark:text-zinc-300" />
      </div>
    </Popover>
  )
}


const NotLogged = () => {
  const { push } = useRouter()

  return (
    <Button
      type="info"
      size="small"
      icon={<UserIcon />}
      onClick={() => push('/login')}
    />
  )
}


const HeaderMy: NextPage<HTMLAttributes<HTMLElement>> = (divAttrs) => {
  const userInfo = useSelector(selectUser, shallowEqual)

  return (
    <div {...divAttrs}>
      {userInfo ? <Logged userInfo={userInfo} /> : <NotLogged />}
    </div>
  )
}


export default HeaderMy
