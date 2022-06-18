import { Triangle } from "@icon-park/react"
import AuthForm from "components/authForm"
import Head from "components/head"

const Register = () => {
  return (
    <div className="relative h-screen bg-white dark:bg-zinc-900">
      <Head
        title="用户注册"
      />
      <div className="pt-5 h-10 xl:block text-main">
        <Triangle />
      </div>
      <AuthForm type="register" />
    </div>
  )
}

Register.noLayout = true

export default Register
