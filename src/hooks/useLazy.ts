import { useUnmount } from "ahooks"
import { MutableRefObject, useEffect, useRef, } from "react"

interface LazyConfig {
  src: string,
  lazy: boolean
}

const defaultLazyConfig: LazyConfig = {
  lazy: true,
  src: ''
}

export const useLazy = (target: MutableRefObject<HTMLImageElement | null>, config: LazyConfig = defaultLazyConfig) => {
  const observerRef = useRef(new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.intersectionRatio > 0 && !target.current!.src) {
        target.current!.src = config.src
      }
    })
  }, {
    threshold: 1.0
  }))

  useEffect(() => {
    if (config.lazy && target.current) observerRef.current.observe(target.current)
  },
    [target, config.lazy]
  )

  useUnmount(() => {
    observerRef.current.disconnect()
  })
}
