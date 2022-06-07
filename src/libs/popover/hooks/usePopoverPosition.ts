import { useReducer, useRef } from "react"
import { getElementSize } from "utils/getElementSize"
import { PopoverPlacement } from ".."

const initialState = {
  top: '0px',
  left: '0px'
}

export const usePopoverPosition = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const childrenRef = useRef<HTMLDivElement | null>(null)


  const overlayPositionReducer = (preState: typeof initialState, type: PopoverPlacement) => {
    const overlaySize = getElementSize(overlayRef.current)
    const childrenSize = getElementSize(childrenRef.current)
    switch (type) {
      case 'top-left': {
        return {
          top: '10px',
          left: -overlaySize!.width - 5 + 'px'
        }
      }

      case 'top-right': {
        return {
          top: '10px',
          left: childrenSize!.width - 5 + 'px'
        }
      }

      case 'bottom-left': {
        return {
          top: childrenSize!.height + 'px',
          left: - overlaySize!.width + childrenSize!.width + 'px'
        }
      }

      case 'bottom-right': {
        return {
          top: childrenSize!.height + 'px',
          left: '0px'
        }
      }

      default: {
        return preState
      }
    }
  }

  const [overlayPosition, overlayPositionDispath] = useReducer(overlayPositionReducer, initialState)

  return {
    overlayRef,
    childrenRef,
    overlayPosition,
    overlayPositionDispath
  }
}
