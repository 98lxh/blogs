import { forwardRef, useEffect, useMemo, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { MapTypeToStyle } from "./utils/mapTypeToStyle"
import message from "./utils/createMessage"

export interface MessageProps {
  type?: 'success' | 'warning' | 'error',
  content: string
  duration?: number
  top?: number
  id?: string
  close?: () => void
}

let timer: any
export const Message = forwardRef<HTMLDivElement, MessageProps>(({
  type = 'success',
  duration = 1000,
  top = 20,
  close,
  content
},
  ref
) => {
  const MapIcon = useMemo(() => MapTypeToStyle[type], [type])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)

    timer = setTimeout(() => {
      close && close()
      setVisible(false)
    }, duration)

    return () => {
      timer && clearTimeout(timer)
    }
  },
    []
  )


  return (
    <CSSTransition classNames="up" timeout={0} in={visible}>
      <div
        ref={ref}
        className="lg:w-auto w-[90vw] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5
         rounded-sm cursor-pointer bg-white shadow-2xl dark:bg-zinc-700 dark:text-zinc-200"
        style={{ top: top + 'px', transition: `all 300ms` }}
      >
        <MapIcon.icon className={`${MapIcon.iconColor} h-2 w-2 mr-1.5 block p-[5px] text-white rounded-full`} />
        <span className="text-sm dark:text-zinc-200">{content}</span>
      </div>
    </CSSTransition >
  )
})

Message.displayName = 'Message'


export default message
