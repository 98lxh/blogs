import { Cube, Back, Github } from "@icon-park/react"
import Button from "libs/button"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { login } from "store/slices/auth.slice"
import { UserForm } from "api/user"
import { useDispatch } from "react-redux"
import { User } from "db/enyity/users"
import message from "libs/message"

const Login = () => {
  const { push } = useRouter()
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm()

  const onLogin = async (data:UserForm) => {
      //表单校验
    await trigger(['nickname', 'password'])
    await dispatch(login(data))
    message.success('登录成功!')
    push('/')
  }

  return (
    <div className="relative h-screen bg-white dark:bg-zinc-900">
      <Head><title>登录</title></Head>
      {/* 头部按钮 */}
      <div className="pt-5 h-10 xl:block text-main">
        <Cube />
      </div>
      {/* 表单 */}
      <div className="block p-3 mt-4 dark:bg-zinc-800 bg-white w-[388px] max-w-[90%] xl:mt-8 rounded-sm shadow-lg absolute left-[50%] top-[80px] translate-x-[-50%]">
        <Button
          className="absolute top-[-10px] left-[-10px]"
          onClick={() => push('/')}
          type="info"
          icon={<Back />}
        />
        <h3 className="text-base dark:text-zinc-200 text-zinc-900 text-center">账号登录</h3>
        <form onSubmit={handleSubmit(onLogin as any)}>
          <input
            className="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main"
            autoComplete="on"
            placeholder="用户名"
            {...register('nickname', {
              minLength: {
                value: 3,
                message:'用户名不能少于3位'
              },
              maxLength: {
                value: 6,
                message:'用户名不能大于6位'
              },
              required: {
                value: true,
                message:'用户名为必填项'
              },
              onBlur: () => trigger(['nickname'])
            })}
          />
          <ErrorMessage
            errors={errors}
            name="nickname"
            render={({ message }) => <p className="text-sm mt-1 text-red-600">{message}</p>}
          />

          <input
            className="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main"
            autoComplete="on"
            placeholder="密码"
            type="password"
            {...register('password',
              {
                minLength: {
                  value: 6,
                  message:'密码不能少于6位'
                },
                maxLength: {
                  value: 16,
                  message:'密码不能大于16位'
                },
                required: {
                  value: true,
                  message:'密码为必填项'
                },
              }
            )}
            onBlur={async () => await trigger(['password'])}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="text-sm mt-1 text-red-600">{message}</p>}
          />
          {/* 跳转按钮 */}
          <div className="pt-1 pb-3 leading-[0px] text-right">
            <Link href="/register">
              <span className="inline-block pb-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 text-base cursor-pointer">去注册</span>
            </Link>
          </div>

          <Button className="dark-bg-zinc-900 w-full">登录</Button>

          {/* 第三方登录 */}
          <div className="flex justify-around mt-4">
            <Button
              type="info"
              className="rounded-3xl cursor-pointer"
              icon={<Github />}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

Login.noLayout = true

export default Login
