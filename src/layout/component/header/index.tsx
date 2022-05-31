import { NextPage } from "next"
import { useRouter } from "next/router"
import { HTMLAttributes } from "react"
import HeaderSearch from "./headerSearch"
import My from "./my"
import Theme from "./theme"


const Header: NextPage<HTMLAttributes<HTMLElement>> = ({ className, ...restProps }) => { 
  const {push} = useRouter()
  
  const onToHome = () => { 
    push('/')  
  }

  return (
    <header
      {...restProps}
      className={`${className} w-full bg-white border-b  px-2 py-1`}
    >
      <div className="flex items-center">
        <img
          className="h-4 cursor-pointer mr-2"
          onClick={onToHome}
          src="https://www.tailwindcss.cn/safari-pinned-tab.svg"
          alt=""
        />
        <HeaderSearch className="mr-1 flex-1" />
        <Theme className="mr-1" />
        <My className="mr-1" />
      </div>
    </header>
  )
}

export default Header
