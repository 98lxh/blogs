import { useIsInitialization } from "hooks/useIsInitialization"
import { NextPage } from "next"
import { Fragment, ReactNode } from "react"

const AppInitialization: NextPage<{ children: ReactNode }> = ({ children }) => {

  const isInitialization = useIsInitialization()
  return (
    <Fragment>
      {!isInitialization && <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-white"></div>}
      {children}
    </Fragment>
  )
}

export default AppInitialization
