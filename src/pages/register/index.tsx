import { Cube } from "@icon-park/react"
import Head from "next/head"
import AuthForm from "components/authForm"

const Register = () => {
  return (
    <div className="relative h-screen bg-white dark:bg-zinc-900">
      <Head><title>用户注册</title></Head>
      <div className="pt-5 h-10 xl:block text-main">
        <Cube />
      </div>
      <AuthForm type="register" />
    </div>
  )
}

Register.noLayout = true

export default Register
