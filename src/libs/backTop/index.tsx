import { FC, UIEvent, useEffect, useState } from "react"
import { ToTop } from "@icon-park/react"
import Button from "libs/button"

const BackTop: FC<{ target: Element | null, visibleHeight?: number }> = ({
  target,
  visibleHeight = 100
}) => {
  const [visible, setVisible] = useState(false)

  const onTargetScroll = (e: UIEvent<Element, UIEvent>) => {
    const scrollTop = e.currentTarget.scrollTop
    if (scrollTop >= visibleHeight) return setVisible(true)
    setVisible(false)
  }

  useEffect(() => {
    target && (target as any).addEventListener("scroll", onTargetScroll)

    return () => {
      target && (target as any).removeEventListener("scroll", onTargetScroll)
    }
  }, [
    target
  ])

  return (
    <Button
      type="info"
      onClick={() => target && target.scrollTo({ top: 0 })}
      className={`fixed bottom-7 right-2 z-50 ${visible ? 'block' : 'hidden'}`}
      icon={<ToTop />}
    />
  )
}


export default BackTop
