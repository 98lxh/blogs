import { NextPage } from "next"
import { HTMLAttributes } from "react"

const Main:NextPage<HTMLAttributes<HTMLElement>> = (props) => { 

  return (
    <main {...props}>main</main>
  )
}

export default Main
