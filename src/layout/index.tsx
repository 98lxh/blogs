import { NextPage } from "next"
import Floating from "./component/floating"
import Header from "./component/header"
import Main from "./component/main"

const Layout:NextPage = () => { 
  
  return (
    <div>
      <Header className="h-header" />
      <Main className="h-main" />
      <Floating />
    </div>
  )
}

export default Layout
