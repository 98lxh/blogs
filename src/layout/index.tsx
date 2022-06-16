import { NextPage } from "next"
import React, { Fragment } from "react"
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
    <Fragment>
      {isShowHeader && <Header className="h-header" />}
      <Main className="lg:h-main h-[calc(100vh-34px)] dark:bg-zinc-900">
        {children}
      </Main>
      <Floating />
    </Fragment>
  )
}

export default Layout
