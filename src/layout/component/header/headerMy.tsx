import Popover from "libs/popover"
import { NextPage } from "next"
import { Down,User,Logout } from "@icon-park/react"
import { HTMLAttributes } from "react"

const HeaderMy: NextPage<HTMLAttributes<HTMLElement>> = (props) => { 
  return (
    <div {...props}>
      <Popover
        overlay={
          (
            <div className="w-[140px] overflow-hidden">
              {
                menus.map(menu => { 
                  const Icon = menu.icon
                  return (
                    <div
                      className="flex items-center p-1 cursor-pointer rounded-sm hover:bg-zinc-100/60"
                      key={menu.id}
                    >
                      <Icon className="w-1.5 h-1.5 mr-1 fill-zinc-900" />
                      <span className="text-zinc-800 text-sm">{ menu.title}</span>
                   </div>
                  )
                })
              }
            </div>
         )
       }
      >
        <div className="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 ">
          <img className="w-3 h-3 rounded-sm" src="https://avatars.githubusercontent.com/u/75563939?v=4" alt="" />
          <Down className="w-1.5 h-1.5 ml-0.5" />
        </div>
      </Popover>
    </div>
  )
}


const menus = [
  {
    id: 0,
    title: '个人资料',
    icon: User,
    path:'/profile'
  },
  {
    id: 2,
    title: '退出登录',
    icon: Logout,
    path:'/'
  },
]

export default HeaderMy