import { ErrorMessage } from "@hookform/error-message"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import message from "libs/message"
import Button from "libs/button"
import { UserForm } from "api/user"
import { Back } from "@icon-park/react"
import { buildFormInfo } from "./utils/buildFormInfo"

export type FormType = 'register' | 'login'

const AuthForm: FC<{ type: FormType }> = ({ type }) => {
  const { push } = useRouter()
  const formInfo = useMemo(() => buildFormInfo(type), [type])
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm()

  const onSubmit = useCallback(async (data: UserForm) => {
    //表单校验
    try {
      await trigger(['nickname', 'password'])
      setLoading(true)
      await formInfo.dispatch(data)
      setLoading(false)
      message.success(formInfo.successMessage)
      push(formInfo.successLink)
    } catch (e) {
      setLoading(false)
    }
  },
    [trigger, setLoading, push, message]
  )

  return (
    <div className="block p-3 mt-4 dark:bg-zinc-800 bg-white w-[388px] max-w-[90%] xl:mt-8 rounded-sm shadow-lg absolute left-[50%] top-[80px] translate-x-[-50%]">
      <Button
        className="absolute top-[-10px] left-[-10px]"
        onClick={() => push('/')}
        type="info"
        icon={<Back />}
      />
      <p className="text-base dark:text-zinc-200 text-center">{formInfo.title}</p>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <input
          className="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main"
          autoComplete="on"
          placeholder="用户名"
          {...register('nickname', {
            minLength: {
              value: 3,
              message: '用户名不能少于3位'
            },
            maxLength: {
              value: 6,
              message: '用户名不能大于6位'
            },
            required: {
              value: true,
              message: '用户名为必填项'
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
                message: '密码不能少于6位'
              },
              maxLength: {
                value: 16,
                message: '密码不能大于16位'
              },
              required: {
                value: true,
                message: '密码为必填项'
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
          <Link href={formInfo.link}>
            <span className="inline-block pb-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 text-base cursor-pointer">{formInfo.linkText}</span>
          </Link>
        </div>

        <Button
          loading={loading}
          className="dark-bg-zinc-900 w-full"
        >
          {formInfo.buttonText}
        </Button>

      </form>
    </div>
  )
}

export default AuthForm
