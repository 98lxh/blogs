import { NextPage } from "next"
import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { usePopoverPosition } from "./hooks/usePopoverPosition"

export type PopoverPlacement = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left'

interface PopopoverProps {
  overlay?: React.ReactElement
  children?: React.ReactNode,
  placement?: PopoverPlacement
}

const Popover: NextPage<PopopoverProps> = (
  { overlay,
    children,
    placement = 'bottom-left'
  }
) => {
  const [visible, setVisible] = useState(false)
  const {overlayRef,childrenRef,overlayPosition,overlayPositionDispath} = usePopoverPosition()

  useEffect(() => { 
    if (!visible) return
    overlayPositionDispath(placement)
  },[visible, overlayPositionDispath])

  return (
      <div className="relative"
        onMouseLeave={() => setVisible(false)}
        onMouseEnter={() => setVisible(true)}
      >
        <div ref={childrenRef}>
          {children}
        </div>
      <CSSTransition
        classNames={`${placement.includes('left') ? 'slider-left' : 'slider-right'}`}
        in={visible}
        timeout={300}
        unmountOnExit={true}>
        <div
          className="absolute p-1 z-20 bg-white border rounded-sm"
          ref={overlayRef}
          style={overlayPosition}
        >
          {overlay}
        </div>
      </CSSTransition>
      </div>
  )
}





export default Popover
