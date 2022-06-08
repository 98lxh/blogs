import { Loading } from "@icon-park/react"
import { useInViewport, useUnmount } from "ahooks"
import { NextPage } from "next"
import React, { useEffect, useRef } from "react"

interface InfiniteProps {
  isLoading: boolean
  isFinished: boolean
  onLoad: () => void,
  children: React.ReactNode,
}

let timer:any
const Infinite: NextPage<InfiniteProps> = ({ children, isLoading, isFinished, onLoad }) => {
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const [loadRefInViewPort] = useInViewport(loadingRef)

  const load = () => {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (!isLoading && !isFinished && loadRefInViewPort) {
        onLoad && onLoad()
      }
    },300)
  }

  useEffect(() => {
    load()
  },
    [
      loadRefInViewPort,
      isLoading
    ]
  )

  useUnmount(() => { 
    if(timer) clearTimeout(timer)
  })

  return (
    <div>
      {children}
      {/* 加载更多 */}
      <div ref={loadingRef} className={`w-2 mx-auto animate-spin text-main ${isLoading ? 'h-2' : 'h-0'}`}><Loading /></div>
      {/* 没有更多数据 */}
      {isFinished && <p className="text-center text-base text-zinc-400">已经没有更多数据了~</p>}
    </div>
  )
}

export default Infinite
