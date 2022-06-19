import { FC, Fragment, ReactNode, useEffect, useState, } from "react"
import { Triangle } from "@icon-park/react"
import { useRouter } from "next/router"

const RouterLoading: FC<{ children: ReactNode, loadingRules?: (RegExp | string)[] }> = ({ children }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onRouterChangeStart = () => {
      setLoading(true)
    }

    const onRouterChangeEnd = () => {
      setLoading(false)
    }

    router.events.on("routeChangeStart", onRouterChangeStart)
    router.events.on("routeChangeComplete", onRouterChangeEnd)
    router.events.on("routeChangeError", onRouterChangeEnd)

    return () => {
      router.events.off("routeChangeStart", onRouterChangeStart)
      router.events.off("routeChangeComplete", onRouterChangeEnd)
      router.events.off("routeChangeError", onRouterChangeEnd)
    }

  }, [
    router.events
  ])

  return (
    <Fragment>
      {
        loading && (
          <div className="fixed t-0 l-0 w-screen h-screen bg-black/60 z-50 text-zinc-200">
            <div className="fixed right-5 bottom-5 text-sm flex flex-col items-center">
              <div className=" animate-pulse w-3 h-3 text-main mb-1">
                <Triangle />
              </div>
              <p>页面加载中,请稍等...</p>
            </div>
          </div>
        )
      }
      {children}
    </Fragment>
  )
}

export default RouterLoading
