import { Triangle } from "@icon-park/react"
import AuthForm from "components/authForm"
import Head from "components/head"

const Login = () => {
  return (
    <div className="relative h-screen bg-white dark:bg-zinc-900">
      <Head
        title="用户登录"
      />
      <div className="pt-5 h-10 xl:block text-main">
        <Triangle />
      </div>
      <AuthForm type="login" />
      {/* todo:第三方登录 */}
    </div>
  )
}

Login.noLayout = true

export default Login
