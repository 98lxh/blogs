import { Triangle } from "@icon-park/react"
import { useRouter } from "next/router"
import Head from "components/head"
import Button from "libs/button"

const Index = () => {
  const { push } = useRouter()
  return (
    <div className=" relative">
      <Head
        title="找不到页面"
      />
      <div className="absolute top-10 left-[50%] translate-x-[-50%] dark:text-zinc-200 w-[4rem]">
        <Triangle className="text-main" />
        <p className="text-2xl mt-2 text-center font-bold">404</p>
        <p className="text-base mt-2 text-center">Page Not Found</p>
      </div>
      <Button
        className="absolute top-[12rem] left-[50%] translate-x-[-50%] p-2"
        onClick={()=>push('/')}
        type="info"
      >
        回到首页
      </Button>
    </div>
  )
}

export default Index
