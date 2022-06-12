import { Cube } from "@icon-park/react"
import AuthForm from "components/authForm"
import Head from "next/head"

const Login = () => {
  return (
    <div className="relative h-screen bg-white dark:bg-zinc-900">
      <Head><title>登录</title></Head>
      {/* 头部按钮 */}
      <div className="pt-5 h-10 xl:block text-main">
        <Cube />
      </div>
      <AuthForm type="login" />
    </div>
  )
}

Login.noLayout = true

export default Login