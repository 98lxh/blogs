import { NextPage } from "next"
import { useRouter } from "next/router"
import { HTMLAttributes } from "react"
import HeaderSearch from "./headerSearch"
import HeaderMy from "./headerMy"
import HeaderTheme from "./headerTheme"


const Header: NextPage<HTMLAttributes<HTMLElement>> = ({ className, ...restProps }) => { 
  const {push} = useRouter()
  
  const onToHome = () => { 
    push('/')  
  }

  return (
    <header
      {...restProps}
      className={`${className} w-full bg-white border border-b px-2 py-0.5`}
    >
      <div className="flex items-center">
        <img
          className="h-4 cursor-pointer mr-2"
          onClick={onToHome}
          src="https://www.tailwindcss.cn/safari-pinned-tab.svg"
          alt=""
        />
        <HeaderSearch className="mr-1 flex-1" />
        <HeaderTheme className="mr-1 h-4" />
        <HeaderMy className="mr-1" />
      </div>
    </header>
  )
}

export default Header
