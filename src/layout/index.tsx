import { NextPage } from "next"
import React from "react"
import { useSelector } from "react-redux"
import { selectIsMobile } from "store/slices/system.slice"
import Floating from "./component/floating"
import Header from "./component/header"
import Main from "./component/main"

const Layout: NextPage<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useSelector(selectIsMobile)
  //pc端不显示header
  const isShowHeader = !isMobile

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
