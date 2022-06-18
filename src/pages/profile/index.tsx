import { Back } from "@icon-park/react";
import { usePermission } from "hooks/usePermission";
import Button from "libs/button";
import confirm from "libs/confirm";
import Input from "libs/input";
import message from "libs/message";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "store/slices/auth.slice";
import { selectIsMobile } from "store/slices/system.slice";

const Profile = () => {
  const isMobile = useSelector(selectIsMobile)
  const userInfo = useSelector(selectUser, shallowEqual)
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<unknown>
  const { push } = useRouter()

  const onLogout = useCallback(() => {
    confirm({
      title: '退出登录',
      content: '是否确认退出登录',
      onConfirm: async () => {
        await dispatch(logout)
        push('/')
      }
    })
  }
    , [push, dispatch])

  usePermission()

  return (
    <div className="h-[100vh] lg:h-main bg-zinc-200 dark:bg-zinc-900 duration-300 overflow-auto lg:p-1">
      <Head>
        <title>{userInfo?.nickname} 个人资料</title>
      </Head>
      <div
        className="relative max-w-screen-lg max-auto bg-white dark:bg-zinc-900 
        duration-300 lg:rounded-sm lg:border-zinc-200 lg:dark:border-zinc-600
        lg:border lg:px-4 lg:py-2 left-[50%] translate-x-[-50%]"
      >
        {
          isMobile
            ? (
              <div className="sticky text-base dark:text-zinc-200 h-4 leading-4 text-center">
                <span>个人资料</span>
                <Back
                  className="absolute left-2 top-[50%] translate-y-[-50%] w-2 h-3"
                  onClick={() => push('/')}
                />
              </div>
            )
            : (
              <div className="text-lg font-bold text-center mb-4 dark:text-zinc-200">个人资料</div>
            )
        }

        <div className="h-full w-full px-1 pb-4 text-sm mt-2 lg:text-center">
          {/* 头像 */}
          <div className="lg:absolute lg:right-[16%]">
            <div className=" relative w-[80px] h-[80px] group lg:cursor-pointer lg:left-1/2 lg:translate-x-[-50%]">
              <img
                className=" rounded-full w-full h-full lg:inline-block"
                src={userInfo?.avatar || ''}
                alt=""
              />
              <div className=" absolute top-0 rounded-full w-full h-full bg-black/40 hidden lg:group-hover:block ">
                <div
                  className="text-xs text-white scale-55 mt-[50%]"
                  onClick={() => message.error('暂未开放上传功能')}
                >
                  点击更换头像
                </div>
              </div>
            </div>
          </div>

          {/* 用户名 */}
          <div className="py-1 lg:flex lg:items-center lg:my-1">
            <span className="w-8 block mb-1 font-bold dark:text-zinc-300 lg:mb-0">用户名</span>
            <Input className="lg:w-[600px]" value={userInfo?.nickname || ""} max={20} />
          </div>

          {/* 个人介绍 */}
          <div className="py-1 lg:flex lg:items-center lg:my-1">
            <span className="w-8 block mb-1 font-bold dark:text-zinc-300 lg:mb-0">个人介绍</span>
            <Input className="lg:w-[600px]" type="textarea" value={userInfo?.introduce || ''} max={20} />
          </div>

          {/* 保存修改 */}
          <Button
            className="w-full mt-2 mb-2 dark:text-zinc-300 lg:ml-[50%] lg:translate-x-[-50%] lg:w-[200px]"
            onClick={() => message.error('暂未开放修改资料功能')}
          >
            保存更改</Button>
          {/* 退出登录 */}
          <Button
            className="w-full mt-2 mb-2 dark:text-zinc-300 lg:ml-[50%] lg:translate-x-[-50%] lg:w-[200px]"
            onClick={onLogout}
          >
            退出登录
          </Button>
        </div>
      </div>

    </div>
  )
}

export default Profile
