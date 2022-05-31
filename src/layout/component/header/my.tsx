import { NextPage } from "next"
import { HTMLAttributes } from "react"

const My: NextPage<HTMLAttributes<HTMLElement>> = (props) => { 
  return (
    <div {...props}>my</div>
  )
}

export default My
