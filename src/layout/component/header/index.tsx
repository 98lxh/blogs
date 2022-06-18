import { NextPage } from "next"
import { useRouter } from "next/router"
import { HTMLAttributes } from "react"
import { Triangle } from "@icon-park/react"
import HeaderSearch from "./headerSearch"
import HeaderMy from "./headerMy"
import ThemeButton from "components/themeButton"


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
        dark:bg-zinc-800 dark:border-b-zinc-700 duration-500 transition-colors
      `}
    >
      <div className="flex items-center">
        <Triangle
          className="h-2 w-2 rounded-sm text-main cursor-pointer mr-2"
          onClick={onToHome}
        />
        <HeaderSearch className="mr-1 flex-1" />
        <ThemeButton isHeader={true} className="mr-1 h-4" />
        <HeaderMy className="mr-1" />
      </div>
    </header>
  )
}

export default Header
