import Button from "libs/button"
import { NextPage } from "next"
import { createElement, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { CSSTransition } from "react-transition-group"

interface ConfigProps {
  title: string
  content: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  close?: () => void
}

let timer:any

const Confirm: NextPage<ConfigProps> = ({
  title,
  content,
  confirmText = '确认',
  cancelText = '取消',
  onCancel,
  onConfirm,
  close
}) => {
  const [confirmVisible, setConfirmVisible] = useState(false)

  useEffect(() => {
    setConfirmVisible(true)
    return () => { 
      if(timer) clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <CSSTransition classNames="fade" timeout={300} unmountOnExit={true} in={confirmVisible}>
        <div
          className="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          onClick={() => {
            setConfirmVisible(false)
            close && close()
          }}
        />
      </CSSTransition>
      <CSSTransition classNames="up" timeout={300} unmountOnExit={true} in={confirmVisible}>
        <div
          className="w-[80%] fixed top-1/3 left-[50%] translate-[50%] z-50 px-2 py-1.5 rounded-sm dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 lg:w-[398px]"
        >
          <div className="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">{title}</div>
          <div className="text-base text-zinc-900 dark:text-zinc-200 mb-2">{content}</div>
          <div className="flex justify-end">
            <Button
              type="info"
              className="mr-2"
              onClick={() => {
                setConfirmVisible(false)
                onCancel && onCancel()
                close && close()
              }}
            >
              {cancelText}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setConfirmVisible(false)
                onConfirm && onConfirm()
                close && close()
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}


const confirm = (confirmProps: ConfigProps) => {
  const container = document.createElement('div')
  const root = createRoot(container)

  confirmProps.close = () => {
    timer = setTimeout(() => {
      document.body.removeChild(container)
    },300)
  }

  const vnode = createElement(Confirm, confirmProps)
  document.body.appendChild(container)
  root.render(vnode)
}


export default confirm
