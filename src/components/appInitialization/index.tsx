import { NextPage } from "next"
import { Fragment, ReactNode } from "react"
import { useIsInitialization } from "hooks/useIsInitialization"
import { useSearchHistory } from "hooks/useSearchHistory"
import { useTheme } from "hooks/useTheme"

const AppInitialization: NextPage<{ children: ReactNode }> = ({ children }) => {
  const isInitialization = useIsInitialization()
    //初始化应用主题
    useTheme()
    //初始化搜索记录
    useSearchHistory()

  return (
    <Fragment>
      {/* 未完成初始化过度中不展示 todo：预加载动画 */}
      {!isInitialization && <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-white" />}
      {children}
    </Fragment>
  )
}

export default AppInitialization
