import { NextPage } from "next"
import React, { HTMLAttributes } from "react"

interface MainProps extends Omit<HTMLAttributes<HTMLElement>,'children'> { 
  children:React.ReactNode
}

const Main: NextPage<MainProps> = ({ children,...props}) => { 

  return (
    <main {...props}>      
      {children}
    </main>
  )
}

export default Main
