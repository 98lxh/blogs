import { Cube } from "@icon-park/react"
import Head from "next/head"
import AuthForm from "components/authForm"

const Register = () => {
  return (
    <div className="relative h-screen bg-white dark:bg-zinc-900">
      <Head><title>注册</title></Head>
      {/* 头部按钮 */}
      <div className="pt-5 h-10 xl:block text-main">
        <Cube />
      </div>
      {/* 表单 */}
      <AuthForm type="register" />
    </div>
  )
}

Register.noLayout = true

export default Register
