import { NextPage } from "next"
import React, { HTMLAttributes } from "react"
import Navigation from "components/navigation"

interface MainProps extends Omit<HTMLAttributes<HTMLElement>,'children'> { 
  children:React.ReactNode
}

const Main: NextPage<MainProps> = ({ children,...props}) => { 

  return (
    <main {...props}>
      <Navigation />
      {children}
    </main>
  )
}

export default Main
