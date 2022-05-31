import { NextPage } from "next"
import { HTMLAttributes } from "react"

const Theme: NextPage<HTMLAttributes<HTMLElement>> = (props) => { 
  return (
    <div {...props}>theme</div>
  )
}

export default Theme
