import Search from "libs/search"
import { NextPage } from "next"
import { HTMLAttributes } from "react"

const HeaderSearch: NextPage<HTMLAttributes<HTMLElement>> = (props) => { 
  return (
    <div {...props}>
      <Search />
    </div>
  )
}

export default HeaderSearch
