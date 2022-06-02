import { NextPage } from "next"
import { useRouter } from "next/router"
import { HTMLAttributes } from "react"
import HeaderSearch from "./headerSearch"
import HeaderMy from "./headerMy"
import HeaderTheme from "./headerTheme"
import { Snowflake } from "@icon-park/react"


const Header: NextPage<HTMLAttributes<HTMLElement>> = ({ className, ...restProps }) => { 
  const {push} = useRouter()
  
  const onToHome = () => { 
    push('/')  
  }

  return (
    <header
      {...restProps}
      className={
        `${className} w-full bg-whit border-b px-2 py-0.5
        dark:bg-zinc-800 dark:border-b-zinc-700
      `}
    >
      <div className="flex items-center">
        <Snowflake
          className="h-2 w-2 rounded-sm text-main cursor-pointer mr-2"
          onClick={onToHome}
        />
        <HeaderSearch className="mr-1 flex-1" />
        <HeaderTheme className="mr-1 h-4" />
        <HeaderMy className="mr-1" />
      </div>
    </header>
  )
}

export default Header
