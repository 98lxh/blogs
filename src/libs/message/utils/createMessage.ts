import { Message } from 'libs/message';
import { MessageProps } from './../index';
import { createRef, createElement, RefObject, FunctionComponentElement, RefAttributes } from "react"
import { createRoot } from "react-dom/client"

interface MessageQueueItem {
  instance: FunctionComponentElement<MessageProps & RefAttributes<HTMLDivElement>>,
  top: number,
  ref: RefObject<HTMLDivElement>,
  id: string
}

const messageQueue: MessageQueueItem[] = []

const message = (props: MessageProps) => {
  const container = document.createElement('div')
  const id = '_mid_' + messageQueue.length
  const root = createRoot(container)
  const ref = createRef<HTMLDivElement>()
  const top = messageQueue.length * 60 + 10

  props.close = () => {
    const removeIndex = messageQueue.findIndex(m => m.id === id)
    if (removeIndex >= 0) messageQueue.splice(removeIndex, 1)

    messageQueue.forEach(m => {
      const { top, ref } = m
      const newTop = top - 60
      ref.current!.style.top = newTop + 'px'
      m.top = newTop
    })


    document.body.removeChild(container)
  }

  const messageVnode = createElement(Message, {
    ...props,
    top,
    id,
    ref
  })

  messageQueue.push({
    instance: messageVnode,
    top,
    id,
    ref
  })

  document.body.appendChild(container)

  root.render(messageVnode)
}


message.warning = (content: string) => {
  message({
    type: 'warning',
    content
  })
}

message.success = (content: string) => {
  message({
    type: 'success',
    content
  })
}

message.error = (content: string) => {
  message({
    type: 'error',
    content
  })
}

export default message
