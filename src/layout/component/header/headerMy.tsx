import { NextPage } from "next"
import { HTMLAttributes } from "react"

const HeaderMy: NextPage<HTMLAttributes<HTMLElement>> = (props) => { 
  return (
    <div {...props}>my</div>
  )
}

export default HeaderMy
