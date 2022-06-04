import { NextPage } from "next"
import React from "react"
import { useTheme } from "hooks/useTheme"
import { useSelector } from "react-redux"
import { selectIsMobile } from "store/system.slice"
import Floating from "./component/floating"
import Header from "./component/header"
import Main from "./component/main"

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useSelector(selectIsMobile)
  //pc端不显示header
  const isShowHeader = !isMobile
  useTheme()

  return (
    <div>
      {isShowHeader && <Header className="h-header" />}
      <Main className="h-main">
        {children}
      </Main>
      <Floating />
    </div>
  )
}

export default Layout
