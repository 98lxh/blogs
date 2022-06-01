import { NextPage } from "next"
import { HTMLAttributes } from "react"

const HeaderTheme: NextPage<HTMLAttributes<HTMLElement>> = (props) => { 
  return (
    <div {...props}>theme</div>
  )
}

export default HeaderTheme
