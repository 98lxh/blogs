import { FC } from "react"
import { BASE_NAME } from "constant"
import Header  from "next/head"

const Head: FC<{ title?: string }> = ({ title }) => { 
  return (
    <Header>
      <title>{title}{title ? ' - ' : '' }{BASE_NAME}</title>
      <link rel="shortcut icon" href="/logo.png" />
    </Header>
  )
}

export default Head
