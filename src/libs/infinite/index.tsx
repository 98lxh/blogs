import { Loading } from "@icon-park/react"
import { useInViewport } from "ahooks"
import { NextPage } from "next"
import React, { useEffect, useRef } from "react"

interface InfiniteProps {
  isLoading: boolean
  isFinished: boolean
  onLoading: () => void,
  // eslint-disable-next-line no-unused-vars
  setIsLoading?:(value:boolean) => void
  children:React.ReactNode
}

const Infinite: NextPage<InfiniteProps> = ({ children, isLoading,isFinished,setIsLoading,onLoading }) => {
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const [loadRefInViewPort] = useInViewport(loadingRef)

  useEffect(() => { 
    if (
       (!isLoading && !isFinished && loadRefInViewPort) 
    ) { 
      setIsLoading && setIsLoading(true)
      onLoading && onLoading()
    }
  },
    [loadRefInViewPort]
  )
  
  return (
    <div>
      { children }
      {/* 加载更多 */}
      <div ref={loadingRef} className={`w-2 mx-auto animate-spin text-main ${isLoading ? 'h-2' : 'h-0'}`}><Loading /></div>
      {/* 没有更多数据 */}
      {isFinished && <p className="text-center text-base text-zinc-400">已经没有更多数据了~</p> }
    </div>
  )
}

export default Infinite
