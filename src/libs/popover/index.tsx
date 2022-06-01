import { NextPage } from "next"
import React, { Fragment, useState } from "react"
import { CSSTransition } from "react-transition-group"

interface PopopoverProps {
  overlay?: React.ReactElement
  children?: React.ReactNode,
  placement?:'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'
}

const Popover: NextPage<PopopoverProps> = ({ overlay, children }) => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <div className="relative"
        onMouseLeave={() => setVisible(false)}
        onMouseEnter={() => setVisible(true)}
      >
        <div>
          {children }
        </div>
      </div>
      <CSSTransition classNames="slider" in={visible} timeout={300} unmountOnExit={true}>
        <div className="absolute p-1 z-20 bg-white border rounded-sm">
          {overlay}
        </div>
      </CSSTransition>
    </Fragment>
  )
}


export default Popover
